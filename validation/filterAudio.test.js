'use strict'
const filterAudioFile = require('./filterAudio'),
  {expect} = require('chai')

/* global describe it before afterEach */

const validMimeTypes = [
  {
    wavFile: {mimeType: 'audio/wav'}
  },
  {
    mpeg: {mimeType: 'audio/mpeg'}
  }
]

const invalidMimeTypes = [
  {
    bmpFile: {mimeType: 'image/bmp'}
  },
  {
    gifFile: {mimeType: 'image/gif'}
  }
]

// TODO: Test filtering for valid mimeTypes
// describe('filterAudioFile', () => {
//   describe('Valid mimetypes', () => {
//     it('permits wav', () =>
//       filterAudioFile(null, waveFile, () => {})
//       .expect(401))
//     it('permits mpeg', () =>
//
//     )
//   })
// })
