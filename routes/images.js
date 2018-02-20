'use strict'

let router = require('express').Router()
let Image = require('../models/Image')

router.route('/')
  .get((req, res) => {
    // Called when we want to list all images
    Image.find((err, data) => {
      console.log('Härrrrrr')
      console.log(data[0].img.data);
      let context = {
        images: data.map((image) => {
          return {
            img: data[0].img.data
          }
        })
      }
    })

    res.render('images/images', context)
  })

module.exports = router
