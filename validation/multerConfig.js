const filterAudioFile = require('./filterAudio')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'audio-to-transcribe/',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  limits: {
    fileSize: 52428800, // Cap uploads at 50MB
    files: 1 // Only one file accepted per form request
  },
  storage: storage,
  fileFilter: filterAudioFile // filter non-audio files from upload
})

module.exports = upload
