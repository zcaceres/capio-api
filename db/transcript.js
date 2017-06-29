// 'use strict'
// const Sequelize = require('sequelize')
// const db = require('./index').db
//
// /* Transcript Model */
// const Transcript = db.define('transcript', {
//   transcriptId: {
//     type: Sequelize.STRING,
//     notNull: true,
//     isAlphanumeric: true,
//     primaryKey: true // Use Capio-generated transcriptID as primary key in db
//   },
//   transcriptBody: {
//     type: Sequelize.TEXT,
//     notNull: true,
//     isAlphanumeric: true,
//     get() {
//       return this.getDataValue('transcriptBody')
//     }
//   }
// })
//
// module.exports = Transcript
