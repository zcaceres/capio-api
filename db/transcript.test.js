'use strict'
const db = require('./index').db
    , Transcript = require('./index').Transcript
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('User', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('notNull validations', () => {
    it('transcriptId cannot be null', () =>
      Transcript.create({ transcriptId: null, transcriptBody: '12asudhash1' })
        .then(transcript => expect(transcript).not.to.be.ok)
        .catch(err => {
            expect(err).to.exist
            expect(err.message)
              .to.equal('null value in column "transcriptId" violates not-null constraint')
          })
        )

    it.only('transcriptBody cannot be null', () =>
      Transcript.create({ transcriptId: '12asudhash1', transcriptBody: null })
        .then(transcript => {
          expect(transcript).not.to.be.ok
        })
        .catch(err => {
          expect(err).to.exist
          expect(err.message)
            .to.equal('notNull Violation: transcriptBody cannot be null')
        })
      )
  })
})
