'use strict'
const chalk = require('chalk')
// const Transcript = require('./transcript')
const POSTGRES_USERNAME = 'zachcaceres' // 'your_name_here'
const POSTGRES_PASSWORD = '' // 'your_password_here'

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
    notNull: true,
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

module.exports = {db, createTranscript, Transcript}
