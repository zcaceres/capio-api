'use strict'
const upload = require('../validation/multerConfig')
const {getTranscript, checkIfAudioTranscribed} = require('../capio/capioManager')
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
// TODO: ERROR HANDLING FOR INCORRECT FORM NAME, please use 'media' for sending your POST
transcript.post('/', upload.single(SEND_FILE_FROM_THIS_FORM_FIELDNAME), (req, res, next) => {
  getTranscript(req.file)
  .then(capioResponseBody => {
    const transcriptID = JSON.parse(capioResponseBody).transcriptID
    checkIfAudioTranscribed(transcriptID, res)
  })
  .then(transcript => {
    // res.json(transcript)
  })
  .catch(err => console.error(err))
  // then delete file
  // persist response in PG
  // send response as JSON back to user

})

module.exports = transcript
