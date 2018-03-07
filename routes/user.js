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

      User.findOne({ username: unauthenticatedUser.username })
        .exec((err, user) => {
          if (err) {
            res.render('error/401')
          } else if (!user) {
            res.render('user/login', {error: 'There is no such user!'})
          } else{
            bcrypt.compare(unauthenticatedUser.password, user.password, (err, result) => {
              if (result === true) {
                req.session.userId = user._id
                res.redirect('/images')
              } else {
                res.render('user/login', {error: 'Wrong password!'})
              }
            })
          }
        })

    } else {
      res.render('user/login', {error: 'You must enter a username and a password'})
    }
  })

router.route('/logout')
.get((req, res) => {
  req.session.destroy(function(err) {
    // cannot access session here 
  })
  res.render('user/logout')
})
module.exports = router
