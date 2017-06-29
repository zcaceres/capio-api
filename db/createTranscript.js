'use strict'
const {Transcript} = require('./index')

/* Last step in POST request cycle. Persists transcript in DB, then sends transcript to user */
// TODO: Add file cleanup logic here from utils/cleanupAudioFile
function createTranscript (transcriptId, transcriptBody, expressResponse) {
  Transcript.create({
    transcriptId,
    transcriptBody
  })
  .then(newTranscript => {
    expressResponse.json(newTranscript) // Send user completed transcript
  })
  .catch(err => console.error(err))
}

module.exports = createTranscript
