'use strict'

let router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.render('contact/index')
  })

module.exports = router