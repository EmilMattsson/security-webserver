'use strict'

let router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.render('about/index')
  })

module.exports = router