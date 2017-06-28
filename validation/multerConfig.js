'use strict'
const filterAudioFile = require('./filterAudio')
const multer = require('multer')

// Specifies the directory and filename that multer will use when storing files
const storage = multer.diskStorage({
  destination: 'audio-to-transcribe/',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// Config for multer, sent to /transcript API route to handle uploading
const upload = multer({
  limits: {
    fileSize: 52428800, // Cap uploads at 50MB
    files: 1 // Only one file accepted per form request
  },
  storage: storage,
  fileFilter: filterAudioFile // filter non-audio files from upload
})

module.exports = upload
