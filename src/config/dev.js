require('dotenv').config()

const config = {
	env: process.env.NODE_ENV,
	port: process.env.PORT_DEV || 3000,
	db: {
		dbUser: process.env.PG_USER_DEV,
		dbPassword: process.env.PG_PASS_DEV,
		dbName: process.env.PG_DB_DEV, 
		dbHost: process.env.PG_HOST_DEV || 'localhost',
		dbPort: process.env.PG_PORT_DEV,
		dialect: "postgres"
	}
}

module.exports = config
