const router = require("express").Router();
const Hospital = require("../models/Hospital");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// Get all hospitals (public)
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: hospitals.length,
      hospitals
    });
  } catch (error) {
    console.error("Get hospitals error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get single hospital
router.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ 
        success: false,
        msg: "Hospital not found" 
      });
    }
    res.json({
      success: true,
      hospital
    });
  } catch (error) {
    console.error("Get hospital error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Search hospitals by specialty
router.get("/search/:specialty", async (req, res) => {
  try {
    const hospitals = await Hospital.find({
      specialties: { $regex: req.params.specialty, $options: "i" },
      isActive: true
    });
    res.json({
      success: true,
      count: hospitals.length,
      hospitals
    });
  } catch (error) {
    console.error("Search hospitals error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Create hospital (admin only)
router.post("/", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json({
      success: true,
      hospital
    });
  } catch (error) {
    console.error("Create hospital error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Update hospital (admin only)
router.put("/:id", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!hospital) {
      return res.status(404).json({ 
        success: false,
        msg: "Hospital not found" 
      });
    }
    res.json({
      success: true,
      hospital
    });
  } catch (error) {
    console.error("Update hospital error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Delete hospital (superadmin only)
router.delete("/:id", auth, roles("superadmin"), async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      return res.status(404).json({ 
        success: false,
        msg: "Hospital not found" 
      });
    }
    res.json({
      success: true,
      msg: "Hospital deleted successfully"
    });
  } catch (error) {
    console.error("Delete hospital error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

module.exports = router;
