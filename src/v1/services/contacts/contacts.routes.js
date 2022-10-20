const express = require('express')
const ContactController = require('./contacts.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateContactSchema,
    createContactSchema,
    getContactSchema
} = require('./contacts.validations')

const router = express.Router()
const controller = new ContactController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getContactSchema, 'params'),
    validatorHandler(updateContactSchema, 'body'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createContactSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getContactSchema, 'params'),
    validatorHandler(updateContactSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getContactSchema, 'params'),
    controller.deleteOne
)

module.exports = router