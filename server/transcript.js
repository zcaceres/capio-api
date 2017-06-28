'use strict'
const fs = require('fs')
const transcript = require('express').Router()
const TRANSCRIPTION_ID = 1
const TEMP_JSON = {
  id: 1,
  body: 'Heres a transcript'
}

transcript.get('/:id', (req, res, next) => {
  // TODO: find model by ID, use ID to name file for transcription
  res.sendStatus(200)
})

transcript.post('/', (req, res, next) => {
  // TODO: check for multipart headers, use multer to stream

  // Direct file stream
  let writeStream = fs.createWriteStream(`audio-to-transcribe/${TRANSCRIPTION_ID}.mp3`) // set name based on ID
  req.pipe(writeStream)
  res.json(TEMP_JSON)
})

module.exports = transcript
