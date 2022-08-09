require('dotenv').config()
const { NODE_ENV } = process.env

const PROD = require('./prod')
const DEV = require('./dev')
const TEST = require('./test')

let env = DEV

if(NODE_ENV === 'prod') {
    env = PROD
}

if(NODE_ENV === 'test') {
    env = TEST
}

module.exports = env