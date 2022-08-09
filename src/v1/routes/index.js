const express = require('express')
const users = require('../services/users/users.routes')

const router = express.Router()

router.use('/users', users)

module.exports = router