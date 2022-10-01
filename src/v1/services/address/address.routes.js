const express = require('express')
const UserController = require('./address.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateUserSchema,
    createUserSchema,
    getUserSchema
} = require('./users.validations')

const router = express.Router()
const controller = new UserController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createUserSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    controller.deleteOne
)

module.exports = router