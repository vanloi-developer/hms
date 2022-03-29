const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const { createToken } = require("../utils/jwt");
const CustomError = require("../models/CustomError");

async function signUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return next(
        new CustomError("User with provided email already exists", 403)
      );
    }

    // Since username should also be unique
    user = await User.findOne({ username });

    if (user) {
      return next(
        new CustomError("User with provided username already exists", 403)
      );
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(201).json({ success: true, user });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) return next(new CustomError("Invalid credentials", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new CustomError(`Invalid credentials`, 400));
    }

    const accessToken = createToken({
      id: user._id,
    });
    user.isLoggedIn = true;
    await user.save();
    res
      .header("Authorization", accessToken)
      .send({ success: true, accessToken, user, role: "admin" });
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
}

async function getAll(req, res) {
  const user = await User.find({});

  res.status(201).json({ success: true, user });
}

async function get(req, res) {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(200).json({
        success: true,
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This user does not exist",
        error: err.message,
      });
    });
}

async function update(req, res) {
  const id = req.params.id;
  const updateObject = req.body;
  User.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User is updated",
        user: updateObject,
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
  User.findByIdAndRemove(id)
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

module.exports = { signUp, login, update, remove, get, getAll };
