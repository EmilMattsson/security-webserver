'use strict'

let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

// Defining schema
let UserSchema = mongoose.Schema({
  // email: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true
  // },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
})
let User = mongoose.model('User', UserSchema)

module.exports = User
