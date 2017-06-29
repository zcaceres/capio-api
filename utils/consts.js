'use strict'
const TIMEOUT_DURATON = 5000
const FILE_SIZE_LIMIT = 52428800 // Cap upload arbitrarily to 50MB
const FILE_CONCURRENT_UPLOAD_LIMIT = 1 // Only one file accepted per form request
const SEND_FILE_FROM_THIS_FORM_FIELDNAME = 'media'
const PORT_NUMBER = 8080
// ^ Set to match Capio API's mandatory 'media' field

module.exports = {
  TIMEOUT_DURATON,
  FILE_SIZE_LIMIT,
  FILE_CONCURRENT_UPLOAD_LIMIT,
  SEND_FILE_FROM_THIS_FORM_FIELDNAME,
  PORT_NUMBER
}
