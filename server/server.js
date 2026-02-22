require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

// In-memory data storage (instead of MongoDB)
const data = {
  users: [],
  hospitals: [
    {
      _id: "1",
      name: "Tikur Anbessa Specialized Hospital",
      location: "Addis Ababa",
      address: "Mexico Square, Addis Ababa",
      specialties: ["General", "Surgery", "Pediatrics", "Cardiology", "Oncology"],
      contact: "011-123-4567",
      emergencyPhone: "907",
      rating: 4.5,
      isActive: true
    },
    {
      _id: "2",
      name: "St. Paulos Hospital",
      location: "Addis Ababa",
      address: "Kirkos, Addis Ababa",
      specialties: ["General", "Orthopedics", "Neurology", "Gastroenterology"],
      contact: "011-156-7890",
      emergencyPhone: "939",
      rating: 4.3,
      isActive: true
    },
    {
      _id: "3",
      name: "Black Lion Hospital",
      location: "Addis Ababa",
      address: "Gurd Shola, Addis Ababa",
      specialties: ["Cardiology", "Cancer Center", "Emergency", "Surgery"],
      contact: "011-234-5678",
      emergencyPhone: "907",
      rating: 4.7,
      isActive: true
    }
  ],
  doctors: [
    {
      _id: "1",
      name: "Dr. Alemayehu Worku",
      specialty: "General Physician",
      hospital: { _id: "1", name: "Tikur Anbessa Specialized Hospital", location: "Addis Ababa" },
      qualification: "MD, MPH",
      experience: 15,
      availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      consultationFee: 100,
      rating: 4.8,
      isAvailable: true
    },
    {
      _id: "2",
      name: "Dr. Tigist Haile",
      specialty: "Cardiologist",
      hospital: { _id: "3", name: "Black Lion Hospital", location: "Addis Ababa" },
      qualification: "MD, Cardiology Specialist",
      experience: 12,
      availableSlots: ["10:00", "11:00", "14:00", "15:00"],
      consultationFee: 200,
      rating: 4.9,
      isAvailable: true
    },
    {
      _id: "3",
      name: "Dr. Bekele Dessalegn",
      specialty: "Pediatrician",
      hospital: { _id: "2", name: "St. Paulos Hospital", location: "Addis Ababa" },
      qualification: "MD, Pediatrics",
      experience: 8,
      availableSlots: ["09:00", "10:00", "11:00", "12:00", "13:00"],
      consultationFee: 80,
      rating: 4.6,
      isAvailable: true
    }
  ],
  bookings: [],
  payments: [],
  idCounter: { users: 0, hospitals: 3, doctors: 3, bookings: 0 }
};

// Generate ID
const generateId = (type) => {
  data.idCounter[type]++;
  return data.idCounter[type].toString();
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use("/api", limiter);

// ==================== AUTH ROUTES ====================
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role, phone } = req.body;
  
  // Check if user exists
  if (data.users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, msg: "User already exists" });
  }
  
  const user = {
    _id: generateId("users"),
    name,
    email,
    password, // In production, hash this!
    role: role || "patient",
    phone,
    createdAt: new Date()
  };
  
  data.users.push(user);
  
  const token = "tena-token-" + user._id;
  res.json({ success: true, token, user: { id: user._id, name, email, role: user.role } });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  const user = data.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  }
  
  const token = "tena-token-" + user._id;
  res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

app.get("/api/auth/me", (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ success: false, msg: "No token" });
  
  const userId = token.replace("tena-token-", "");
  const user = data.users.find(u => u._id === userId);
  
  if (!user) return res.status(404).json({ success: false, msg: "User not found" });
  
  res.json({ success: true, user });
});

// ==================== HOSPITAL ROUTES ====================
app.get("/api/hospitals", (req, res) => {
  res.json({ success: true, count: data.hospitals.length, hospitals: data.hospitals });
});

app.get("/api/hospitals/search/:specialty", (req, res) => {
  const hospitals = data.hospitals.filter(h => 
    h.specialties.some(s => s.toLowerCase().includes(req.params.specialty.toLowerCase()))
  );
  res.json({ success: true, count: hospitals.length, hospitals });
});

// ==================== DOCTOR ROUTES ====================
app.get("/api/doctors", (req, res) => {
  const { specialty, hospital } = req.query;
  let doctors = data.doctors.filter(d => d.isAvailable);
  
  if (specialty) {
    doctors = doctors.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
  }
  
  res.json({ success: true, count: doctors.length, doctors });
});

app.get("/api/doctors/:id", (req, res) => {
  const doctor = data.doctors.find(d => d._id === req.params.id);
  if (!doctor) return res.status(404).json({ success: false, msg: "Doctor not found" });
  res.json({ success: true, doctor });
});

// ==================== BOOKING ROUTES ====================
app.post("/api/booking", (req, res) => {
  const { doctorId, hospitalId, appointmentDate, appointmentTime, symptoms } = req.body;
  const token = req.header("Authorization");
  
  if (!token) return res.status(401).json({ success: false, msg: "Please login" });
  
  const userId = token.replace("tena-token-", "");
  const doctor = data.doctors.find(d => d._id === doctorId);
  
  if (!doctor) return res.status(404).json({ success: false, msg: "Doctor not found" });
  
  const booking = {
    _id: generateId("bookings"),
    patient: { _id: userId, name: "User" },
    doctor: { _id: doctor._id, name: doctor.name, specialty: doctor.specialty },
    hospital: { _id: hospitalId, name: doctor.hospital.name, location: doctor.hospital.location },
    appointmentDate,
    appointmentTime,
    symptoms,
    status: "pending",
    paymentStatus: "pending",
    paymentAmount: doctor.consultationFee,
    createdAt: new Date()
  };
  
  data.bookings.push(booking);
  res.json({ success: true, booking });
});

app.get("/api/booking/my-bookings", (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ success: false, msg: "Please login" });
  
  const userId = token.replace("tena-token-", "");
  const bookings = data.bookings.filter(b => b.patient._id === userId);
  
  res.json({ success: true, count: bookings.length, bookings });
});

// ==================== PAYMENT ROUTES ====================
app.get("/api/payment/telebirr-info", (req, res) => {
  res.json({
    success: true,
    phoneNumber: "0978788034",
    instructions: [
      "1. Open your Telebirr mobile app",
      "2. Send payment to the number shown",
      "3. Take a screenshot of the confirmation",
      "4. Upload the screenshot below",
      "5. Wait for admin verification"
    ]
  });
});

app.post("/api/payment/upload", (req, res) => {
  res.json({ success: true, msg: "Payment submitted successfully" });
});

app.get("/api/payment/pending", (req, res) => {
  const pending = data.bookings.filter(b => b.paymentStatus === "paid");
  res.json({ success: true, count: pending.length, bookings: pending });
});

// ==================== AI ROUTES ====================
app.post("/api/ai/chat", (req, res) => {
  const { message } = req.body;
  const lowerMessage = message.toLowerCase();
  
  let response = "Thank you for contacting TENA. For proper assessment, please provide more details about your symptoms. I recommend consulting with a healthcare professional.";
  
  if (lowerMessage.includes("fever") || lowerMessage.includes("hot")) {
    response = "Based on your symptoms, you may have a fever. I recommend: 1) Rest and stay hydrated, 2) Take paracetamol if needed, 3) Monitor your temperature, 4) Consult a doctor if fever persists over 3 days.";
  } else if (lowerMessage.includes("cough")) {
    response = "For cough symptoms, I suggest: 1) Stay hydrated with warm fluids, 2) Use honey (if not allergic), 3) Avoid smoking, 4) Rest adequately, 5) See a doctor if cough lasts more than 2 weeks.";
  } else if (lowerMessage.includes("headache")) {
    response = "For headache relief: 1) Rest in a quiet, dark room, 2) Stay hydrated, 3) Take pain relievers if needed, 4) Avoid screen time, 5) Consult a doctor if severe or persistent.";
  } else if (lowerMessage.includes("stomach") || lowerMessage.includes("nausea")) {
    response = "Stomach concerns require attention: 1) Eat light, easily digestible foods, 2) Stay hydrated, 3) Avoid spicy/greasy foods, 4) Consider antacids, 5) See a doctor if symptoms persist.";
  } else if (lowerMessage.includes("chest") || lowerMessage.includes("heart")) {
    response = "Chest symptoms should be taken seriously. Please: 1) Rest immediately, 2) Avoid strenuous activity, 3) Monitor for shortness of breath, 4) Seek immediate medical attention if pain is severe.";
  }
  
  res.json({ success: true, reply: response, timestamp: new Date().toISOString() });
});

// ==================== ADMIN ROUTES ====================
app.get("/super-admin-portal-83921/stats", (req, res) => {
  res.json({
    success: true,
    stats: {
      totalUsers: data.users.length,
      totalHospitals: data.hospitals.length,
      totalDoctors: data.doctors.length,
      totalBookings: data.bookings.length,
      pendingPayments: data.bookings.filter(b => b.paymentStatus === "paid").length,
      confirmedBookings: data.bookings.filter(b => b.status === "confirmed").length
    }
  });
});

app.get("/super-admin-portal-83921/bookings", (req, res) => {
  res.json({ success: true, count: data.bookings.length, bookings: data.bookings });
});

// Serve static files
app.use(express.static(path.join(__dirname, "client/dist")));

// Catch-all for SPA
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   🏥 TENA Flow Digital - Server Running                  ║
║   URL: http://localhost:${PORT}                            ║
║   Admin: http://localhost:${PORT}/super-admin-portal-83921 ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
