'use strict'

let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

// Defining schema
let UserSchema = mongoose.Schema({
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

// hashing a password before saving it to the database
UserSchema.pre('save', (next) => {
  let user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
  })
})
let User = mongoose.model('User', UserSchema)
module.exports = User
