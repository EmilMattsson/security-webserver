'use strict'

let router = require('express').Router()
let User = require('../models/User')

router.route('/register')
  .get((req, res) => {
    res.render('user/register')
  })
  .post((req, res, next) => {
    if (req.body.username &&
      req.body.password) {
        var userData = {
          username: req.body.username,
          password: req.body.password,
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
          if (err) {
            return next(err)
          } else {
            return res.redirect('/');
          }
        });
      }
    })

module.exports = router
