'use strict'
const upload = require('../validation/multerConfig')
const {getTranscript, checkIfAudioTranscribed} = require('../capio/capioManager')
const transcript = require('express').Router()
const Transcript = require('../db').Transcript
const {SEND_FILE_FROM_THIS_FORM_FIELDNAME} = require('../utils/consts')

/* Retrieve persistent Transcript by Capio transcriptID */
transcript.get('/:id', (req, res, next) => {
  Transcript.findById(req.params.id)
  .then(foundTranscript => {
    res.json(foundTranscript.transcriptBody)
  })
  .catch(next)
})

/* Create a new Transcript from a media file */
// TODO: Edge case where file stream comes in as x-www-form-urlencoded not multipart
// TODO: Error handling for incorrect form name: e.g. please use 'media' for sending your POST request
transcript.post('/', upload.single(SEND_FILE_FROM_THIS_FORM_FIELDNAME), (req, res, next) => {
  getTranscript(req.file)
  .then(capioResponseBody => {
    const transcriptID = JSON.parse(capioResponseBody).transcriptID
    checkIfAudioTranscribed(transcriptID, res)
  })
  .catch(next)
})

module.exports = transcript
