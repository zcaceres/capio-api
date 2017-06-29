'use strict'
const Sequelize = require('sequelize')
const db = require('./index')

/* Transcript Model */
const Transcript = db.define('transcript', {
  body: {
    type: Sequelize.TEXT,
    notNull: true,
    isAlphanumeric: true,
    get() {
      return this.getDataValue('body')
    }
  }
})

module.exports = Transcript
