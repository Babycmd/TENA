const router = require("express").Router();
const Booking = require("../models/Booking");
const Doctor = require("../models/Doctor");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// Create a new booking (patient only)
router.post("/", auth, async (req, res) => {
  try {
    const { doctorId, hospitalId, appointmentDate, appointmentTime, symptoms } = req.body;

    // Check if doctor exists and has the slot available
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ 
        success: false,
        msg: "Doctor not found" 
      });
    }

    // Check if slot is available
    if (!doctor.availableSlots.includes(appointmentTime)) {
      return res.status(400).json({ 
        success: false,
        msg: "Selected time slot is not available" 
      });
    }

    // Create booking
    const booking = new Booking({
      patient: req.user.id,
      doctor: doctorId,
      hospital: hospitalId,
      appointmentDate,
      appointmentTime,
      symptoms,
      paymentAmount: doctor.consultationFee,
      status: "pending",
      paymentStatus: "pending"
    });

    await booking.save();
    await booking.populate([
      { path: "patient", select: "name email phone" },
      { path: "doctor", select: "name specialty" },
      { path: "hospital", select: "name location" }
    ]);

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get patient's bookings
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.user.id })
      .populate("doctor", "name specialty consultationFee")
      .populate("hospital", "name location")
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get single booking
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialty consultationFee availableSlots")
      .populate("hospital", "name location contact");

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        msg: "Booking not found" 
      });
    }

    // Check if user owns the booking or is admin
    if (booking.patient._id.toString() !== req.user.id && 
        !["admin", "superadmin"].includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        msg: "Not authorized to view this booking" 
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Cancel booking
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        msg: "Booking not found" 
      });
    }

    // Check ownership
    if (booking.patient.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        msg: "Not authorized to cancel this booking" 
      });
    }

    // Only pending bookings can be cancelled
    if (booking.status !== "pending") {
      return res.status(400).json({ 
        success: false,
        msg: "Cannot cancel this booking" 
      });
    }

    booking.status = "cancelled";
    await booking.save();

    // Free up the slot
    const doctor = await Doctor.findById(booking.doctor);
    doctor.availableSlots.push(booking.appointmentTime);
    await doctor.save();

    res.json({
      success: true,
      msg: "Booking cancelled successfully",
      booking
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Update booking status (admin only)
router.put("/:id/status", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate("patient", "name email")
     .populate("doctor", "name specialty")
     .populate("hospital", "name location");

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        msg: "Booking not found" 
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get all bookings (admin only)
router.get("/admin/all", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const { status, paymentStatus, date } = req.query;
    let query = {};

    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
    }

    const bookings = await Booking.find(query)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialty")
      .populate("hospital", "name location")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

module.exports = router;
