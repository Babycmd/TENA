const router = require("express").Router();
const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// Hidden Super Admin Portal - Access: /super-admin-portal-83921
// This route is protected and should not be indexed by search engines

// Get dashboard statistics
router.get("/stats", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const [
      totalUsers,
      totalHospitals,
      totalDoctors,
      totalBookings,
      pendingPayments,
      confirmedBookings
    ] = await Promise.all([
      User.countDocuments(),
      Hospital.countDocuments(),
      Doctor.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ paymentStatus: "paid" }),
      Booking.countDocuments({ status: "confirmed" })
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalHospitals,
        totalDoctors,
        totalBookings,
        pendingPayments,
        confirmedBookings
      }
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get all users (admin only)
router.get("/users", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    
    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Update user role (superadmin only)
router.put("/users/:id/role", auth, roles("superadmin"), async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ 
        success: false,
        msg: "User not found" 
      });
    }

    res.json({
      success: true,
      msg: `User role updated to ${role}`,
      user
    });
  } catch (error) {
    console.error("Update user role error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

// Get all bookings with filters
router.get("/bookings", auth, roles("admin", "superadmin"), async (req, res) => {
  try {
    const { status, paymentStatus, startDate, endDate } = req.query;
    let query = {};

    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(query)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialty")
      .populate("hospital", "name location")
      .sort({ createdAt: -1 })
      .limit(100);

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

// Seed initial data (for development)
router.post("/seed", auth, roles("superadmin"), async (req, res) => {
  try {
    // Check if data already exists
    const existingHospitals = await Hospital.countDocuments();
    if (existingHospitals > 0) {
      return res.status(400).json({ 
        success: false,
        msg: "Data already exists. Cannot seed again." 
      });
    }

    // Create sample hospitals
    const hospitals = await Hospital.insertMany([
      {
        name: "Tikur Anbessa Specialized Hospital",
        location: "Addis Ababa",
        address: "Mexico Square, Addis Ababa",
        specialties: ["General", "Surgery", "Pediatrics", "Cardiology", "Oncology"],
        contact: "011-123-4567",
        emergencyPhone: "907",
        rating: 4.5
      },
      {
        name: "St. Paulos Hospital",
        location: "Addis Ababa",
        address: "Kirkos, Addis Ababa",
        specialties: ["General", "Orthopedics", "Neurology", "Gastroenterology"],
        contact: "011-156-7890",
        emergencyPhone: "939",
        rating: 4.3
      },
      {
        name: "Black Lion Hospital",
        location: "Addis Ababa",
        address: "Gurd Shola, Addis Ababa",
        specialties: ["Cardiology", "Cancer Center", "Emergency", "Surgery"],
        contact: "011-234-5678",
        emergencyPhone: "907",
        rating: 4.7
      }
    ]);

    // Create sample doctors
    await Doctor.insertMany([
      {
        name: "Dr. Alemayehu Worku",
        specialty: "General Physician",
        hospital: hospitals[0]._id,
        qualification: "MD, MPH",
        experience: 15,
        availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        consultationFee: 100,
        rating: 4.8
      },
      {
        name: "Dr. Tigist Haile",
        specialty: "Cardiologist",
        hospital: hospitals[2]._id,
        qualification: "MD, Cardiology Specialist",
        experience: 12,
        availableSlots: ["10:00", "11:00", "14:00", "15:00"],
        consultationFee: 200,
        rating: 4.9
      },
      {
        name: "Dr. Bekele Dessalegn",
        specialty: "Pediatrician",
        hospital: hospitals[1]._id,
        qualification: "MD, Pediatrics",
        experience: 8,
        availableSlots: ["09:00", "10:00", "11:00", "12:00", "13:00"],
        consultationFee: 80,
        rating: 4.6
      }
    ]);

    res.json({
      success: true,
      msg: "Sample data seeded successfully",
      hospitals: hospitals.length
    });
  } catch (error) {
    console.error("Seed data error:", error);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

module.exports = router;
