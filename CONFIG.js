'use strict'
const {TIMEOUT_DURATON} = require('./utils/consts')

/* Your configuration here! */
const POSTGRES_USERNAME = 'zachcaceres' // 'your_name_here'
const POSTGRES_PASSWORD = '' // 'your_password_here'
const CAPIO_TEMP_API_K = '300aa92da5d547349d4836f66e957469' // your_api_key_here
const CAPIO_API_POST_URL = 'http://apidev.capio.ai/v1/speech/transcribe'
const CAPIO_API_GET_URL = 'http://apidev.capio.ai/v1/speech/transcript/'

// Enable to drop tables and force a re-sync
const FORCE_DB_SYNC = false

/* Ignore: configs for POST and GET HTTP requests */
const POST_REQUEST_CONFIG = {
  url: CAPIO_API_POST_URL,
  method: 'POST',
  formData: {
    apiKey: CAPIO_TEMP_API_K,
    media: {
      value: null, // Set by audio file in capioManager.js
      options: {
        contentType: null // Set by audio file mimetype in capioManager.js
      }
    },
    async: 'true',
    timeout: TIMEOUT_DURATON // Wait 5 seconds before timing out
  }
}
const GET_REQUEST_CONFIG = {
  url: null, // Set to Capio transcriptId by capioManager
  method: 'GET',
  headers: {
    apiKey: CAPIO_TEMP_API_K
  },
  timeout: TIMEOUT_DURATON // Wait 5 seconds before timing out
}

module.exports = {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  CAPIO_TEMP_API_K,
  CAPIO_API_GET_URL,
  CAPIO_API_POST_URL,
  FORCE_DB_SYNC,
  POST_REQUEST_CONFIG,
  GET_REQUEST_CONFIG
}
