'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let expHbs = require('express-handlebars')
let path = require('path')
let session = require('express-session')

let app = express()
let port = process.env.PORT || 8000

// config --------------------------------------------------

// Initilize the database asap
require('./libs/dbHelper').initilize()

// View engine
app.engine('handlebars', expHbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Add support for handling application/json
app.use(bodyParser.json())

// Add support for handling HTML form data
app.use(bodyParser.urlencoded({extended: true}))

// The framework should look in the folder "public" for static resources
app.use(express.static(path.join(__dirname, '/')))

// Enable the use of authentification through sessions
app.use(session({
  secret: 'emil är bäst',
  resave: true,
  saveUninitialized: false
}))

// Load routes as "mini-apps"
app.use('/', require('./routes/home.js'))
app.use('/images', require('./routes/images.js'))
app.use('/contact', require('./routes/contact.js'))
app.use('/about', require('./routes/about.js'))
app.use('/user', require('./routes/user.js'))

// Error handling
app.use((req, res, next) => {
  res.status(404).redirect('error/404')
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(401).redirect('error/401')
})

// four parameters for errors
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

// Launch application ---------------------------------------
app.listen(port, () => {
  console.log('Express app listening on port %s!', port)
})
