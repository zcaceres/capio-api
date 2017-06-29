'use strict'
const request = require('request')
const fs = require('fs')
const CAPIO_API_URL = 'http://partnersdev.capio.ai/v1/speech/transcribe'
const CAPIO_TEMP_API_K = '300aa92da5d547349d4836f66e957469'

function getTranscript(file, expressRes) {
  const options = {
    url: CAPIO_API_URL,
    method: 'POST',
    formData: {
      apiKey: CAPIO_TEMP_API_K,
      media: {
        value: fs.createReadStream(file.path),
        options: {
          contentType: file.mimetype,
        }
      },
      async: 'true',
    }
  }
  // Make request to Capio API
  request(options, (err, res, body) => {
    if (err) {
      return console.error('ERR', err)
    }
    // TODO: check when transcript is finished, send final response as JSON
    expressRes.json(body)
  })
}

module.exports = getTranscript
