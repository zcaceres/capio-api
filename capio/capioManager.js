'use strict'
const request = require('request') // HTTP Manager
const rp = require('request-promise-native') // Native Promises wrapper around request
const fs = require('fs')
const chalk = require('chalk')
const CAPIO_API_POST_URL = 'http://apidev.capio.ai/v1/speech/transcribe'
const CAPIO_API_GET_URL = 'http://apidev.capio.ai/v1/speech/transcript/'
const CAPIO_TEMP_API_K = '300aa92da5d547349d4836f66e957469'
const TIMEOUT_DURATON = 5000

function getTranscript(file) {
  const POST_REQUEST_CONFIG = {
    url: CAPIO_API_POST_URL,
    method: 'POST',
    formData: {
      apiKey: CAPIO_TEMP_API_K,
      media: {
        value: fs.createReadStream(file.path),
        options: {
          contentType: file.mimetype
        }
      },
      async: 'true',
      timeout: TIMEOUT_DURATON // Wait 5 seconds before timing out
    }
  }
  // Returns a promise containing Capio transcriptID
  return rp(POST_REQUEST_CONFIG)
}

function checkIfAudioTranscribed(transcriptId, expressResponse) {
  let currentTimeout
  console.log(chalk.yellow('Pinging Capio to see if transcript is ready...'))
  const GET_REQUEST_CONFIG = {
    url: CAPIO_API_GET_URL + transcriptId,
    method: 'GET',
    headers: {
      apiKey: CAPIO_TEMP_API_K
    },
    timeout: TIMEOUT_DURATON // Wait 5 seconds before timing out
  }
  // TODO: Handle different types of timeouts
  request(GET_REQUEST_CONFIG, function(err, res, body) {
    if (err) {
      console.error(err)
      return
      // TODO: WHAT DO WE DO WITH THIS IN TRANSCRIPT IF WE ERROR?
    }
    if (res.statusCode === 202) {
      currentTimeout = setTimeout(checkIfAudioTranscribed, TIMEOUT_DURATON, transcriptId, expressResponse)
    } else if (res.statusCode === 200) {
      if (currentTimeout) clearTimeout(currentTimeout)
      console.log('successful request')
      expressResponse.json(JSON.parse(body))
    } else {
      if (currentTimeout) clearTimeout(currentTimeout)
      console.log('something went wrong with the request')
      // TODO: another response, send along error to Express
      return res.statusMessage
    }
  })
}

module.exports = {
  getTranscript,
  checkIfAudioTranscribed
}
