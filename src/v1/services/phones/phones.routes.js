const express = require('express')
const PhoneController = require('./phones.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updatePhonesSchema,
    createPhonesSchema,
    getPhonesSchema
} = require('./phones.validations')

const router = express.Router({mergeParams: true})
const controller = new PhoneController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getPhonesSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createPhonesSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getPhonesSchema, 'params'),
    validatorHandler(updatePhonesSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getPhonesSchema, 'params'),
    controller.deleteOne
)

module.exports = router