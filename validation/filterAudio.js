'use strict'
const chalk = require('chalk')

/*
acceptFile is a callback provided by multer library. It's used to reject
or accept a file based on the logic defined here. Pass false to REJECT
and true to ACCEPT the file

TODO: use encoding to confirm mimetypes rather than header string
TODO: support for all FFMPEG mimetypes
TODO: Better error handling for mimetypes, currently sends user 500 w/opaque error
*/
module.exports = function filterAudioFile(req, file, acceptFile) {
  // Parses file mimetype for 'audio' format. Ex. accepts 'audio/mpeg'
  if (!file.mimetype.startsWith('audio')) {
    console.error(chalk.red('Tried to upload a non-audio file'))
    acceptFile(null, false)
  } else {
    acceptFile(null, true)
  }
}
