const express = require('express')
const AddressController = require('./address.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateAddressSchema,
    createAddressSchema,
    getAddressSchema
} = require('./address.validations')

const router = express.Router({mergeParams: true})
const controller = new AddressController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getAddressSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createAddressSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getAddressSchema, 'params'),
    validatorHandler(updateAddressSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getAddressSchema, 'params'),
    controller.deleteOne
)

router.post('/findMyOwn', 
    controller.findMyOwn
)

module.exports = router