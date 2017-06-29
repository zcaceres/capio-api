const filterAudioFile = require('./filterAudio')
    , {expect} = require('chai')

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
//       request(app)
//       .get(`/api/users/1`)
//       .expect(401)
//     )
//   })
//
//   describe('POST', () =>
//     describe('when not logged in', () => {
//       it('creates a user', () =>
//         request(app)
//           .post('/api/users')
//           .send({
//             email: 'beth@secrets.org',
//             password: '12345'
//           })
//           .expect(201))
//
//       it('redirects to the user it just made', () =>
//         request(app)
//           .post('/api/users')
//           .send({
//             email: 'eve@interloper.com',
//             password: '23456',
//           })
//           .redirects(1)
//           .then(res => expect(res.body).to.contain({
//             email: 'eve@interloper.com'
//           })))
//     }))
// })
