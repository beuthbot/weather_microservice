const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// get all the existing routes
app.use(require('./routes'))

module.exports = app
