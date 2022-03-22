const Area = require("../models/areaModel");

const CustomError = require("../models/CustomError");

const create = async (req, res, next) => {
  try {
    const area = new Area({
      ...req.body,
    });

    await area.save();

    res.status(201).json({ success: true, area });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

const getAll = async (req, res, next) => {
  const area = await Area.find();

  res.status(201).json({ success: true, area });
};

module.exports = { create, getAll };
