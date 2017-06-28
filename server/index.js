const app = require('express')()
const PORT_NUM = 8080

// Router for Transcript service
app.use('/transcript', require('./transcript'))

// Route to handle requests to anywhere else
app.get('*', function(req, res, next) {
  let err = new Error('Page Not Found!')
  err.statusCode = 404
  next(err)
})

// TODO: Add middleware here

/* Error Handling Middleware */
app.use(function(err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500 // Sets generic server error status code if none on 'err'
  res.status(err.statusCode).send(err.message)
})

app.listen(PORT_NUM, () => {
  console.log(`---Started HTTP Server for Capio Transcription Service---`)
  console.log(`Listening on http://localhost:${PORT_NUM}`)
})

module.exports = app
