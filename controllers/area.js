const Area = require("../models/areaModel");

const CustomError = require("../models/CustomError");

async function create(req, res) {
  try {
    const area = new Area({
      ...req.body,
    });

    await area.save();

    res.status(201).json({ success: true, area });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
}

async function getAll(req, res) {
  const area = await Area.find();

  res.status(201).json({ success: true, area });
}

async function get(req, res) {
  const id = req.params.id;
  Area.findById(id)
    .then((role) => {
      res.status(200).json({
        success: true,
        area: area,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This area does not exist",
        error: err.message,
      });
    });
}

async function update(req, res) {
  const id = req.params.id;
  const updateObject = req.body;
  Area.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Area is updated",
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

async function remove(req, res) {
  const id = req.params.id;
  Area.findByIdAndRemove(id)
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
