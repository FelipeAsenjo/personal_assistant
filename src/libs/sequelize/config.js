const { 
  dbUser,
  dbPassword,
  dbName,
  dbHost 
} = require('../../config').db

const USER = encodeURIComponent(dbUser)
const PASS = encodeURIComponent(dbPassword)

module.exports = {
  "development": {
    "username": USER,
    "password": PASS,
    "database": dbName,
    "host": dbHost,
    "dialect": "postgres"
  },
  "test": {
    "username": USER,
    "password": PASS,
    "database": dbName,
    "host": dbHost,
    "dialect": "postgres"
  },
  "production": {
    "username": USER,
    "password": PASS,
    "database": dbName,
    "host": dbHost,
    "dialect": "postgres"
  }
}