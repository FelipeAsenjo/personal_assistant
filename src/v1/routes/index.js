const express = require('express')
const auth = require('../services/auth/auth.routes')
const users = require('../services/users/users.routes')
const tasks = require('../services/tasks/tasks.routes')
const { isAuthenticated, hasRole } = require('../../middlewares/auth.handler')

const router = express.Router()

router.use('/auth', auth)
router.use('/users',
//  isAuthenticated, 
//  hasRole([0, 1]),
 users)
router.use('/tasks',
 isAuthenticated, 
 tasks)

module.exports = router