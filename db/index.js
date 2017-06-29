'use strict'
const chalk = require('chalk')
const {POSTGRES_USERNAME, POSTGRES_PASSWORD} = require('../CONFIG')
// const Transcript = require('./transcript')


// TODO: Get config settings for development or production here

const Sequelize = require('sequelize')
const connectionString = 'postgresql://localhost:5432/capio-api'

console.log(chalk.yellow(`Opening database connection to ${connectionString}`))

const db = new Sequelize(
  'capio-api',
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    'dialect': 'postgres',
    'port': 5432,
    logging: false
  }
)

/* Transcript Model */
const Transcript = db.define('transcript', {
  transcriptId: {
    type: Sequelize.STRING,
    notNull: true,
    isAlphanumeric: true,
    primaryKey: true // Use Capio-generated transcriptID as primary key in db
  },
  transcriptBody: {
    type: Sequelize.TEXT,
    allowNull: false, // A quirk in Sequelize makes .TEXT allow null if notNull validator is used
    isAlphanumeric: true,
    get() {
      return this.getDataValue('transcriptBody')
    }
  }
})

function createTranscript (transcriptId, transcriptBody, expressResponse) {
  Transcript.create({
    transcriptId,
    transcriptBody
  })
  .then(newTranscript => {
    expressResponse.json(newTranscript) // Send user completed transcript
  })
  .catch(err => console.error(err))
}

db.sync({force: false})
.then(() => {
  db.didSync = true
})
.catch(err => console.error(err))

module.exports = {db, createTranscript, Transcript}
