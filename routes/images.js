'use strict'

let router = require('express').Router()
let Image = require('../models/Image')
let fs = require('fs')

router.route('/')
  .get((req, res) => {
    // Called when we want to list all images
    Image.find((err, data) => {
      let counter = 0
      let context = {
        images: data.map((image) => {
          fs.writeFile('./images/image' + counter + '.jpg', image.img.data, 'binary', (err) => {
            if (err) console.error(err)
          })
          counter += 1
          return {
            img: '/images/image' + counter + '.jpg'
          }
        })
      }
      res.render('images/index', context)
    })
  })

module.exports = router
