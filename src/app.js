const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const v1Router = require('./v1/routes')
const { 
    logErrors,
    boomErrorHandler,
    ormErrorHandler, 
    errorHandler 
} = require('./middlewares/error.handler')

const app = express()

app.use(cors())
app.use(xss())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1', v1Router)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(ormErrorHandler)
app.use(errorHandler)

module.exports = app