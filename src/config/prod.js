require('dotenv').config()

const config = {
	env: process.env.NODE_ENV,
	port: process.env.PORT_PROD || 3000,
	JWT_KEY: process.env.JWT_KEY,
	db: {
		dbUser: process.env.PG_USER_PROD,
		dbPassword: process.env.PG_PASS_PROD,
		dbName: process.env.PG_DB_PROD, 
		dbHost: process.env.PG_HOST_PROD,
		dbPort: process.env.PG_PORT_PROD,
		dialect: "postgres"
	}
}

module.exports = config
