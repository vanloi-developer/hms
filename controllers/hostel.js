const Hostel = require("../models/hostelModel");

const CustomError = require("../models/CustomError");

const create = async (req, res, next) => {
  try {
    const hostel = new Hostel({
      ...req.body,
    });

    await hostel.save();

    res.status(201).json({ success: true, hostel });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

const getAll = async (req, res, next) => {
  const hostel = await Hostel.find();

  res.status(201).json({ success: true, hostel });
};

module.exports = { create, getAll };
