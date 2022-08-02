const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const indexRouter = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', indexRouter)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

module.exports = app