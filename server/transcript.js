'use strict'

const transcript = require('express').Router()

transcript.get('/', (req, res, next) => {
  res.sendStatus(200)
})

// TODO: GET route here
// TODO: POST route here

module.exports = transcript
