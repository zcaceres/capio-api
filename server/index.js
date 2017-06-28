const app = require('express')()
const PORT_NUM = 8080

app.use('/transcript', require('./transcript'))

app.listen(PORT_NUM, () => {
  console.log(`---Started HTTP Server for Capio Transcription Service---`)
  console.log(`Listening on http://localhost:${PORT_NUM}`)
})
