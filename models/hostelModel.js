const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  expenditure: {
    type: String,
    required: false,
  },

  area_id: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hostel", hostelSchema);
