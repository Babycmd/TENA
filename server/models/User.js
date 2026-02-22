const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin', 'superadmin'],
    default: 'patient'
  },
  // Additional fields for patients
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  // Additional fields for doctors
  specialty: {
    type: String,
    trim: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  availableSlots: [{
    type: String
  }],
  consultationFee: {
    type: Number,
    default: 50
  },
  // Payment tracking
  paymentStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  paymentReceipt: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
