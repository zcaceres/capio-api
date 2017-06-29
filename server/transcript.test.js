'use strict'
const request = require('supertest')
    , {expect} = require('chai')
    , db = require('../db').db
    , app = require('./index')
    , CAPIO_TEMP_API_K = require('../utils/consts').CAPIO_TEMP_API_K
    , path = require('path')


/* global describe it before afterEach */

/* Check package.json to edit timeout parameter in Mocha.
Default is 40 seconds to allow Capio time to respond with transcript */
describe('Testing Transcript API', () => {
  before('Await db sync', () => db.didSync)
  after('Clear tables', () => db.truncate({ cascade: true }))
  let transcriptId // Stores newly created transcript from POST for use in GET
  // Better practice would be to avoid any dependencies between these two tests!

  describe('POST /transcript', () =>
      it('creates and sends a new transcript', () =>
        request(app)
          .post(`/transcript`)
          .type('form')
          .field('Content-Type', 'multipart/form-data')
          .field('apiKey', CAPIO_TEMP_API_K)
          .field('async', 'true')
          .attach('media', path.resolve(__dirname, '../media-samples/yes.mp3'))
          .then((response) => {
            transcriptId = response.body.transcriptId
            expect(response.res.statusCode).to.equal(200)
          })
      ))
      // TODO: Test content of Capio response rather than status code

  describe('GET /transcript/:id', () =>
    describe('get file by id', () =>
      it('succeeds with a 200', () =>
        request(app)
          .get(`/transcript/${transcriptId}`)
          .expect(200)
      )))
      // TODO: Test content of DB response rather than status code
})
