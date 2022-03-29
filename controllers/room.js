const Room = require("../models/roomModel");

const CustomError = require("../models/CustomError");

async function create(req, res) {

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

async function getAll(req, res) {

  const room = await Room.find({});

  res.status(201).json({ success: true, room });
};

async  function get(req, res) {
  const id = req.params.id;
  Room.findById(id)
    .then((room) => {
      res.status(200).json({
        success: true,
        room: room,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This room does not exist",
        error: err.message,
      });
    });
}

async function update(req, res) {
  const id = req.params.id;
  const updateObject = req.body;
  Room.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Room is updated",
        room: updateObject,
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
  Room.findByIdAndRemove(id)
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
