'use strict'
const app = require('express')()
const PORT_NUMBER = 8080

/* Router for Transcript service */
app.use('/transcript', require('./transcript'))

/* Handles requests to anywhere other than /transcript */
app.all('*', function(req, res, next) {
  let err = new Error('Nothing found at ' + req.originalUrl)
  err.statusCode = 404
  next(err)
})

// TODO: Add middleware here

/* Error Handling */
app.use(function(err, req, res, next) {
  console.error('ERROR:', err.message)
  if (!err.statusCode) err.statusCode = 500 // Sets generic server error status code if none on 'err'
  res.status(err.statusCode).send(err.message)
})

app.listen(PORT_NUMBER, () => {
  console.log(`---Started HTTP Server for Capio Transcription Service---`)
  console.log(`Listening on http://localhost:${PORT_NUMBER}`)
})

module.exports = app
