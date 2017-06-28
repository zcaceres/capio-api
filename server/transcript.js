'use strict'
const fs = require('fs')
const upload = require('../validation/multerConfig')

const transcript = require('express').Router()
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
transcript.post('/', upload.single('audio'), (req, res, next) => {
  // if file is saved
  // send to capio transcription service
  // wait for response
  // persist response in PG
  // send response as JSON back to user
  res.json(TEMP_JSON)
})

module.exports = transcript
