'use strict'

let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

// Defining schema
let UserSchema = new mongoose.Schema({
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

//authenticate input againt database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        let err = new Error('User not found.')
        err.status = 401
        return callback(err)
      }
      bcrypt.hash(password, 10).then((hash) => {
        password = hash
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            return callback(null, user)
          } else {
            return callback()
          }
        })
      })
    })
}
module.exports = User
