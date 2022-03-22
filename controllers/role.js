const Role = require("../models/roleModel");

const CustomError = require("../models/CustomError");

const create = async (req, res, next) => {
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
};

const getAll = async (req, res, next) => {
  const response =  await Role.find();


  res.status(201).json({ success: true, response });

};

module.exports = { create, getAll };
