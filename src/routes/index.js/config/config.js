require('dotenv').config()

const config = {
	env: process.env.NODE_ENV,
	port: 3000,
	db: {
		dbUser: process.env.POSTGRES_USER,
		dbPassword: process.env.POSTGRES_PASSWORD,
		dbName: process.env.POSTGRES_DB, 
		dbHost: process.env.POSTGRES_HOST,
		dbPort: process.env.POSTGRES_PORT,
		dialect: "postgres"
	}
}

module.exports = config
