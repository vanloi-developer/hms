const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  area_name: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Area", areaSchema);
