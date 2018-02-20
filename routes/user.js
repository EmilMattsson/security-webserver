'use strict'

let router = require('express').Router()
let User = require('../models/User')

router.route('/login')
  .get((req, res) => {
    res.render('user/login')
  })
  .post((req, res) => {
    let unvalidatedUsername = req.body.username
    let unvalidatedPassword = req.body.password

    let user = new User({
      usernname: unvalidatedUsername,
      password: unvalidatedPassword
    })

    if (unvalidatedUsername.length && unvalidatedPassword.length > 0) {
      user.save().then(() => {
        res.redirect('/home')
      }).catch(err => {
        console.log(err.message)
        response.render('user/login', {error: "Username already taken!"})
      })
    } else {
      res.render('user/login', {error: 'You must enter a username and a password'})
    }
  })

module.exports = router
