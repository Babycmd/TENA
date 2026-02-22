const router = require("express").Router();
const Doctor = require("../models/Doctor");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// Get all doctors (public)
router.get("/", async (req, res) => {
  try {
    const { specialty, hospital } = req.query;
    let query = { isAvailable: true };
    
    if (specialty) {
      query.specialty = { $regex: specialty, $options: "i" };
    }
    if (hospital) {
      query.hospital = hospital;
    }

    const doctors = await Doctor.find(query)
      .populate("hospital", "name location contact")
      .sort({ rating: -1, createdAt: -1 });

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get single doctor
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("hospital", "name location contact specialties");
    
    if (!doctor) {
      return res.status(404).json({ 
        success: false,
        msg: "Doctor not found" 
      });
    }
    res.json({
      success: true,
      doctor
    });
  } catch (error) {
    console.error("Get doctor error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Search doctors by specialty
router.get("/search/:specialty", async (req, res) => {
  try {
    const doctors = await Doctor.find({
      specialty: { $regex: req.params.specialty, $options: "i" },
      isAvailable: true
    }).populate("hospital", "name location");

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error("Search doctors error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get doctors by hospital
router.get("/hospital/:hospitalId", async (req, res) => {
  try {
    const doctors = await Doctor.find({ 
      hospital: req.params.hospitalId,
      isAvailable: true 
    }).sort({ specialty: 1 });

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error("Get doctors by hospital error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Create doctor (admin only)
router.post("/", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    await doctor.populate("hospital", "name location");
    
    res.status(201).json({
      success: true,
      doctor
    });
  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Update doctor (admin only)
router.put("/:id", auth, roles("admin", "superadmin", "doctor"), async (req, res) => {
  try {
    // Doctors can only update their own profile
    if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ _id: req.params.id, user: req.user.id });
      if (!doctor) {
        return res.status(403).json({ 
          success: false,
          msg: "Not authorized to update this profile" 
        });
      }
    }

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("hospital", "name location");

    if (!doctor) {
      return res.status(404).json({ 
        success: false,
        msg: "Doctor not found" 
      });
    }
    res.json({
      success: true,
      doctor
    });
  } catch (error) {
    console.error("Update doctor error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Update doctor availability slots
router.put("/:id/slots", auth, roles("doctor", "admin", "superadmin"), async (req, res) => {
  try {
    const { availableSlots } = req.body;
    
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { availableSlots },
      { new: true }
    ).populate("hospital", "name location");

    if (!doctor) {
      return res.status(404).json({ 
        success: false,
        msg: "Doctor not found" 
      });
    }
    res.json({
      success: true,
      doctor
    });
  } catch (error) {
    console.error("Update slots error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Delete doctor (superadmin only)
router.delete("/:id", auth, roles("superadmin"), async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ 
        success: false,
        msg: "Doctor not found" 
      });
    }
    res.json({
      success: true,
      msg: "Doctor deleted successfully"
    });
  } catch (error) {
    console.error("Delete doctor error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

module.exports = router;
