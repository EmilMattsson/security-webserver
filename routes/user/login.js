'use strict'

let router = require('express').Router()
let User = require('../models/User')
let bcrypt = require('bcrypt')

// UNUSED CODE
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
      bcrypt.hash(req.body.password, 10).then((hash) => {
        user.password = hash
        console.log(user)
        user.save().then(() => {
          res.redirect('/')
        }).catch(err => {
          console.log(err.message)
          response.render('user/register', {error: "Username already taken!"})
        })
      })

    } else {
      res.render('user/register', {error: 'You must enter a username and a password'})
    }
  })

module.exports = router
