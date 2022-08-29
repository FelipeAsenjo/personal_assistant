const express = require('express')
const AuthController = require('./auth.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { loginSchema } = require('./auth.validations')

const router = express.Router()
const controller = new AuthController()

router.post('/', 
    validatorHandler(loginSchema, 'body'),
    controller.login
)

router.get('/', controller.logout)

module.exports = router