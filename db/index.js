'use strict'
const chalk = require('chalk')
const {FORCE_DB_SYNC, POSTGRES_USERNAME, POSTGRES_PASSWORD} = require('../CONFIG')
const Sequelize = require('sequelize')
const connectionString = 'postgresql://localhost:5432/capio-api'

const db = new Sequelize(
  'capio-api',
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
    port: 5432,
    logging: false
  }
)

console.log(chalk.yellow(`Opening database connection to ${connectionString}`))

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

/* Sync DB, notify tests they can begin running with .didSync */
db.sync({force: FORCE_DB_SYNC})
.then(() => {
  db.didSync = true
})
.catch(err => console.error(err))

module.exports = {db, Transcript}
