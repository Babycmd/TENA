const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true,
    trim: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  qualification: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    default: 0
  },
  availableSlots: [{
    type: String
  }],
  consultationFee: {
    type: Number,
    default: 50
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  image: {
    type: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
DoctorSchema.index({ specialty: 1, hospital: 1 });

module.exports = mongoose.model("Doctor", DoctorSchema);
