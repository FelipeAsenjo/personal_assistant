const express = require('express')
const auth = require('../services/auth/auth.routes')
const users = require('../services/users/users.routes')
const { isAuthenticated, hasRole } = require('../../middlewares/auth.handler')

const router = express.Router()

router.use('/auth', auth)
router.use('/users', isAuthenticated, hasRole([0, 1]), users)

module.exports = router