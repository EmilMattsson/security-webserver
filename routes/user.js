'use strict'

let router = require('express').Router()
let User = require('../models/User')
let bcrypt = require('bcrypt')

router.route('/register')
  .get((req, res) => {
    res.render('user/register')
  })
  .post((req, res) => {
    if (req.body.username && req.body.password) {
      let user = new User({
        username: req.body.username,
        password: req.body.password
      })

      User.findOne({ username: unauthenticatedUser.username })
        .exec((err, user) => {
          if (err) {
            res.render('error/401')
          } else if (!user) {
          res.render('error/500')
          }
          console.log(unauthenticatedUser.password)
          console.log(user.password)
          bcrypt.compare(unauthenticatedUser.password, user.password, (err, result) => {
          if (result === true) {
            console.log(user._id)
            req.session.userId = user._id
            console.log(req.session)

            res.redirect('/images')
          } else {
            res.redirect('/user/login')
          }
        })
      })

    } else {
      res.render('user/register', {error: 'You must enter a username and a password'})
    }
  })

module.exports = router
