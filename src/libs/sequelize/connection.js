const { Sequelize } = require('sequelize')
const setupModels = require('./models')

const {
  dbUser,
  dbPassword,
  dbName,
  dbHost,
  dialect
} = require('../../config').db

const DB_USER = encodeURIComponent(dbUser)
const DB_PASS = encodeURIComponent(dbPassword)

const sequelize = new Sequelize(dbName, DB_USER, DB_PASS, {
  host: dbHost,
  dialect
})

setupModels(sequelize)

// sequelize.sync({ alter: true })
        
const dbConnection = async () => {
  try { 
    await sequelize.authenticate()                                                                 
    console.log('Database connected')                                                        
  } catch( err ) {
    throw new Error( err )
  }
}

module.exports = {
  dbConnection,
  sequelize
}