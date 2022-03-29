const Hostel = require("../models/hostelModel");

const CustomError = require("../models/CustomError");

export function create(req, res) {
  try {
    const hostel = new Hostel({
      ...req.body,
    });

    await hostel.save();

    res.status(201).json({ success: true, hostel });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
}

export function getAll(req, res) {
  const hostel = await Hostel.find();

  res.status(201).json({ success: true, hostel });
}

export function get(req, res) {
  const id = req.params.id;
  Hostel.findById(id)
    .then((role) => {
      res.status(200).json({
        success: true,
        hostel: hostel,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This hostel does not exist",
        error: err.message,
      });
    });
}

export function update(req, res) {
  const id = req.params.id;
  const updateObject = req.body;
  Hostel.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Hostel is updated",
        role: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
}

export function remove(req, res) {
  const id = req.params.id;
  Hostel.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}

module.exports = { create, getAll, get, update, remove };
