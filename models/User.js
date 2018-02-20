'use strict'

let mongoose = require('mongoose')

// Defining schema
let userSchema = mongoose.Schema({
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
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  }
})
let User = mongoose.model('User', userSchema)
module.exports = User
