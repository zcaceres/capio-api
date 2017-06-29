'use strict'
const upload = require('../validation/multerConfig')
const getTranscript = require('../capio/capioManager')
const transcript = require('express').Router()

// Set to match Capio API's mandatory 'media' field
const SEND_FILE_FROM_THIS_FORM_FIELDNAME = 'media'
const TEMP_JSON = {
  id: 1,
  body: 'Heres a transcript'
}

transcript.get('/:id', (req, res, next) => {
  // TODO: find model by ID, use ID to name file for transcription
  res.json(TEMP_JSON)
})

// TODO: Edge case where file stream comes in as x-www-form-urlencoded
// let writeStream = fs.createWriteStream(`audio-to-transcribe/${TRANSCRIPTION_ID}.mp3`) // set name based on ID
// req.pipe(writeStream)

// TODO: ERROR HANDLING FOR INCORRECT FORM NAME, please use 'audio' for sending your POST
transcript.post('/', upload.single(SEND_FILE_FROM_THIS_FORM_FIELDNAME), (req, res, next) => {
  getTranscript(req.file, res)
  console.log('FILE', req.file)
  // then send to capio transcription service
  // then delete file
  // persist response in PG
  // send response as JSON back to user

})

module.exports = transcript
