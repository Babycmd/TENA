const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, "receipt-" + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

// Get Telebirr payment details
router.get("/telebirr-info", async (req, res) => {
  try {
    res.json({
      success: true,
      phoneNumber: process.env.TELEBIRR_NUMBER || "0978788034",
      instructions: [
        "1. Open your Telebirr mobile app",
        "2. Send payment to the number shown",
        "3. Take a screenshot of the confirmation",
        "4. Upload the screenshot below",
        "5. Wait for admin verification"
      ]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Upload payment receipt
router.post("/upload", auth, upload.single("receipt"), async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        msg: "Please upload a receipt image" 
      });
    }

    if (!bookingId) {
      return res.status(400).json({ 
        success: false,
        msg: "Booking ID is required" 
      });
    }

    // Find booking and update
    const booking = await Booking.findById(bookingId);
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
        msg: "Not authorized" 
      });
    }

    // Update booking with payment info
    booking.paymentReceipt = req.file.filename;
    booking.paymentStatus = "paid";
    booking.paymentDate = Date.now();
    await booking.save();

    res.json({
      success: true,
      msg: "Payment receipt uploaded successfully. Waiting for verification.",
      receipt: req.file.filename
    });
  } catch (error) {
    console.error("Upload receipt error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Verify payment (admin only)
router.put("/verify/:bookingId", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const { status, notes } = req.body;

    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ 
        success: false,
        msg: "Booking not found" 
      });
    }

    // Update payment status
    booking.paymentStatus = status;
    if (status === "verified") {
      booking.status = "confirmed";
      
      // Remove the booked slot from doctor's available slots
      const Doctor = require("../models/Doctor");
      const doctor = await Doctor.findById(booking.doctor);
      const slotIndex = doctor.availableSlots.indexOf(booking.appointmentTime);
      if (slotIndex > -1) {
        doctor.availableSlots.splice(slotIndex, 1);
        await doctor.save();
      }
    }

    if (notes) {
      booking.notes = notes;
    }

    booking.updatedAt = Date.now();
    await booking.save();

    await booking.populate([
      { path: "patient", select: "name email" },
      { path: "doctor", select: "name specialty" }
    ]);

    res.json({
      success: true,
      msg: `Payment ${status} successfully`,
      booking
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get pending payments (admin only)
router.get("/pending", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      paymentStatus: "paid",
      status: { $ne: "cancelled" }
    })
      .populate("patient", "name email phone")
      .populate("doctor", "name specialty")
      .populate("hospital", "name location")
      .sort({ paymentDate: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error("Get pending payments error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

module.exports = router;
