const app = require('./app')
const server = require('http').createServer(app)
const config = require('./config')
const { dbConnection } = require('./libs/sequelize/connection')

dbConnection()
server.listen(config.port, () => {
	console.log(`App listening at port ${ config.port }`)
})