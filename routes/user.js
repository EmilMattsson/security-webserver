'use strict'

let router = require('express').Router()
let User = require('../models/User')
let bcrypt = require('bcrypt')

router.route('/login')
  .get((req, res) => {
    res.render('user/login')
  })
  .post((req, res) => {
    if (req.body.username && req.body.password) {
      let unauthenticatedUser = new User({
        username: req.body.username,
        password: req.body.password
      })
      bcrypt.hash(req.body.password, 10).then((hash) => {
        unauthenticatedUser.password = hash
        User.findOne({ username: unauthenticatedUser.username })
          .exec((err, user) => {
            console.log(user)
            if (err) {
              res.render('error/401')
            } else if (!user) {
              res.render('error/500')
            }
            bcrypt.hash(unauthenticatedUser.password, 10).then((hash) => {
              unauthenticatedUser.password = hash
              bcrypt.compare(unauthenticatedUser.password, user.password, (err, result) => {
                if (result === true) {
                  res.redirect('/images')
                } else {
                  res.render('error/401')
                }
              })
            })
          })
      })

    } else {
      res.render('user/login', {error: 'You must enter a username and a password'})
    }
  })

module.exports = router
