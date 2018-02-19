'use strict'

let router = require('express').Router()
let Image = require('../models/Image')

router.route('/')
  .get((req, res) => {
    // Called when we want to list all images
    Image.find((err, data) => {
      console.log(data.img)
      let context = {
        images: data.map((image) => {
          return {
            img: data.img.data
          }
        })
      }
    })

    res.render('images/images', context)
  })

module.exports = router
