require('dotenv').config()

const config = {
	env: process.env.NODE_ENV,
	port: process.env.PORT_TEST || 5000,
	JWT_KEY: process.env.JWT_KEY_TEST,
	db: {
		dbUser: process.env.PG_USER_TEST,
		dbPassword: process.env.PG_PASS_TEST,
		dbName: process.env.PG_DB_TEST, 
		dbHost: process.env.PG_HOST_TEST || 'localhost',
		dbPort: process.env.PG_PORT_TEST,
		dialect: "postgres"
	}
}

module.exports = config