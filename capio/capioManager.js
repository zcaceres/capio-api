'use strict'
const request = require('request') // HTTP Manager
const rp = require('request-promise-native') // Native Promises wrapper around request
const fs = require('fs')
const chalk = require('chalk')
const {
  CAPIO_API_GET_URL,
  POST_REQUEST_CONFIG,
  GET_REQUEST_CONFIG
} = require('../CONFIG')
const {TIMEOUT_DURATON} = require('../utils/consts')
const createTranscript = require('../db/createTranscript')

/* POSTs audio data to Capio API. Returns a promise containing transcriptId */
function getTranscript(file) {
  prepPOSTRequest(file.path, file.mimetype)
  return rp(POST_REQUEST_CONFIG)
}

/*
  Repeatedly pings Capio API w/transcript id to monitor status of transcription
  If successful, pass transcript and Express response to DB

  // TODO: Error handling if connection times out e.g. Capio never responds
  // TODO: Refactor to promise-based syntax for readability
  // TODO: Handle other errors (404, 500) in request callback
*/
function checkIfAudioTranscribed(transcriptId, expressResponse) {
  let currentTimeout // Used to cleanup timeout each check. Should refactor this
  console.log(chalk.yellow('Pinging Capio to see if transcript is ready...'))
  prepGETRequest(transcriptId)

  request(GET_REQUEST_CONFIG, function(err, res, body) {
    if (err) {
      console.error(err)
      return
    }

    clearTimeout(currentTimeout) // Clean up previous timeout

    if (res.statusCode === 202) { // Transcription still processing, ping again later
      currentTimeout = setTimeout(checkIfAudioTranscribed, TIMEOUT_DURATON, transcriptId, expressResponse)
    } else if (res.statusCode === 200) { // Transcription complete
      createTranscript(transcriptId, body, expressResponse)
    } else {
      return res.statusMessage
    }
  })
}

// Helper function to set file parameters onto POST request
function prepPOSTRequest(filePath, mimetype) {
  POST_REQUEST_CONFIG.formData.media.value = fs.createReadStream(filePath)
  POST_REQUEST_CONFIG.formData.media.options.contentType = mimetype
}

// Helper function to set transcriptId parameters onto GET request
function prepGETRequest(transcriptId) {
  GET_REQUEST_CONFIG.url = CAPIO_API_GET_URL + transcriptId
}

module.exports = {
  getTranscript,
  checkIfAudioTranscribed
}
