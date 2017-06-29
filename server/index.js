'use strict'
const app = require('express')()
const logger = require('morgan')
const chalk = require('chalk')
const {PORT_NUMBER} = require('../utils/consts')

/* Logging middleware to monitor requests */
app.use(logger('dev'))

/* Router for Transcript service */
app.use('/transcript', require('./transcript'))

/* Handles requests to anywhere other than /transcript */
app.all('*', function(req, res, next) {
  let err = new Error('Nothing found at ' + req.originalUrl)
  err.statusCode = 404
  next(err)
})

/* Error Handling */
app.use(function(err, req, res, next) {
  console.error(chalk.red('ERROR IN EXPRESS HANDLER:', err.message))
  if (!err.statusCode) err.statusCode = 500 // Sets generic server error status code if none on 'err'
  res.status(err.statusCode).send(err.message)
})

app.listen(PORT_NUMBER, () => {
  console.log(`---Started HTTP Server for Capio Transcription Service---`)
  console.log(`Listening on http://localhost:${PORT_NUMBER}`)
})

module.exports = app
