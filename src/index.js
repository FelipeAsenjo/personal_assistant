const app = require('./app')
const server = require('http').createServer(app)
const config = require('./config/config')
//const dbConnection = require('./db/connection')

//dbConnection()
server.listen(config.port, () => {
	console.log(`App listening at port ${ config.port }`)
})
