'use strict'
const filterAudioFile = require('./filterAudio')
const multer = require('multer')
const {FILE_SIZE_LIMIT, FILE_CONCURRENT_UPLOAD_LIMIT} = require('../utils/consts')

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
    fileSize: FILE_SIZE_LIMIT,
    files: FILE_CONCURRENT_UPLOAD_LIMIT
  },
  storage: storage,
  fileFilter: filterAudioFile // filter non-audio files from upload
})

module.exports = upload
