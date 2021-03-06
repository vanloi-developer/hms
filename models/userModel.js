const mongoose = require('mongoose')

// FIXME: Don't store the loggedIn status and token of user in database (if you want restful api).

// TODO: Add user's fullName

// username is made unique (should be unique)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  full_name: {
    type: String,
    required: true,
  },

  id_card_number: {
    type: String,
    required: false,
  },
  hometown: {
    type: String,
    required: false,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: Boolean,
    required: false,
  },
  rental_date: {
    type: Date,
  },

  type: {
    type: Boolean,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  telephone_number: {
    type: String,

  }
})

module.exports = mongoose.model('User', userSchema)
