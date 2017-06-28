const chalk = require('chalk')

/* NOTE: acceptFile is a callback provided by multer. It's used to reject
or accept a file based on the logic defined here. Pass false to REJECT
and true to ACCEPT the file */
module.exports = function filterAudioFile(req, file, acceptFile) {
  // Parses file mimetype for 'audio' format. Ex. accepts 'audio/mpeg'
  if (!file.mimetype.startsWith('audio')) {
    console.error(chalk.yellow('Tried to upload a non-audio file'))
    acceptFile(null, false)
  } else {
    acceptFile(null, true)
  }
}
