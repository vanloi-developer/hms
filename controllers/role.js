const Role = require("../models/roleModel");

const CustomError = require("../models/CustomError");

async function create(req, res) {
  const { role_name, active } = req.body;

  try {
    // Since username should also be unique

    const role = new Role({
      role_name,
      active,
    });

    await role.save();

    res.status(201).json({ success: true, role });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
}
async function getAll(req, res) {
  const response = await Role.find();
  res.status(201).json({ success: true, response });
}

async function get(req, res) {
  const id = req.params.id;
  Role.findById(id)
    .then((role) => {
      res.status(200).json({
        success: true,
        role: role,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This role does not exist",
        error: err.message,
      });
    });
}

async function update(req, res) {
  const id = req.params.id;
  const updateObject = req.body;
  Role.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Role is updated",
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
  Role.findByIdAndRemove(id)
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
