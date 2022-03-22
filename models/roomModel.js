const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hostel_id: {
    type: String,
    required: true,
  },
  room_name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  furniture_type: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", roomSchema);
