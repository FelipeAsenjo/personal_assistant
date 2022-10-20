const express = require('express')
const TransferController = require('./transfers.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateTransferSchema,
    createTransferSchema,
    getTransferSchema
} = require('./transfers.validations')

const router = express.Router({mergeParams: true})
const controller = new TransferController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getTransferSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createTransferSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getTransferSchema, 'params'),
    validatorHandler(updateTransferSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getTransferSchema, 'params'),
    controller.deleteOne
)

module.exports = router