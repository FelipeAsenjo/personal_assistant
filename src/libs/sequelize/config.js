const { 
  dbUser,
  dbPassword,
  dbName,
  dbHost,
  dbPort,
  dialect
 } = require('../../config').db
 console.log(dbPassword)

const USER = encodeURIComponent(dbUser)
const PASS = encodeURIComponent(dbPassword)

module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: 'localhost',
    port: dbPort,
    dialect: dialect
  },
  test: {
    username: USER,
    password: PASS,
    database: dbName,
    host: 'localhost',
    port: dbPort,
    dialect: dialect
  },
  production: {
    username: USER,
    password: PASS,
    database: dbName,
    // host: dbHost,
    port: dbPort,
    dialect: dialect
  }
}
