/* NOTE: acceptFile is a callback provided by multer. It's used to reject
or accept a file based on that file's properties. Pass false to REJECT
and true to ACCEPT the file */
module.exports = function filterAudioFile(req, file, acceptFile) {
  if (!file.mimetype.startsWith('audio')) acceptFile(null, false)
  else acceptFile(null, true)
  console.log('FILEPROPS', file)
}
