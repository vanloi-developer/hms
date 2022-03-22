const Room = require("../models/roomModel");

const CustomError = require("../models/CustomError");

const create = async (req, res, next) => {
  try {
    const room = new Room({
      ...req.body,
    });

    await room.save();

    res.status(201).json({ success: true, room });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

const getAll = async (req, res, next) => {
  const room = await Room.find({});

  res.status(201).json({ success: true, room });
};

module.exports = { create, getAll };
