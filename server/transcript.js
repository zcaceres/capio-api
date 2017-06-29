'use strict'
const upload = require('../validation/multerConfig')
const {getTranscript, checkIfAudioTranscribed} = require('../capio/capioManager')
const transcript = require('express').Router()
// const Transcript = require('../db').Transcript
const Transcript = require('../db').Transcript

// Set to match Capio API's mandatory 'media' field
const SEND_FILE_FROM_THIS_FORM_FIELDNAME = 'media'

transcript.get('/:id', (req, res, next) => {
  Transcript.findById(req.params.id)
  .then(trans => {
    res.json(trans.transcriptBody)
  })
  .catch(next)
})

// TODO: Edge case where file stream comes in as x-www-form-urlencoded
// TODO: ERROR HANDLING FOR INCORRECT FORM NAME, please use 'media' for sending your POST
transcript.post('/', upload.single(SEND_FILE_FROM_THIS_FORM_FIELDNAME), (req, res, next) => {
  getTranscript(req.file)
  .then(capioResponseBody => {
    const transcriptID = JSON.parse(capioResponseBody).transcriptID
    checkIfAudioTranscribed(transcriptID, res)
  })
  .catch(next)
})

module.exports = transcript
