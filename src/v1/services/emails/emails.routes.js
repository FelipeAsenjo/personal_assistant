const express = require('express')
const EmailController = require('./emails.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateEmailSchema,
    createEmailSchema,
    getEmailSchema
} = require('./emails.validations')

const router = express.Router({mergeParams: true})
const controller = new EmailController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getEmailSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createEmailSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getEmailSchema, 'params'),
    validatorHandler(updateEmailSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getEmailSchema, 'params'),
    controller.deleteOne
)

router.post('/findMyOwn', controller.findMyOwn)

router.post('/findByContact', controller.findByContact)

router.post('/findByAddress', controller.findByAddress)

module.exports = router