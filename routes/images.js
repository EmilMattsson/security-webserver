'use strict'

let router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.render('images/images', { Image: image.all() })
  })

module.exports = router
