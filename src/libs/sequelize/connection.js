const { Sequelize } = require('sequelize')

const {
  dbUser,
  dbPassword,
  dbName,
  dbHost,
  dialect
} = require('../../config/config').db

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect
})

        
const dbConnection = async () => {
        
  try { 
      
    await db.authenticate()                                                                 
    console.log('Database connected')                                                        
                                                                                            
  } catch( err ) {
    throw new Error( err )
  }
      
}

module.exports = dbConnection