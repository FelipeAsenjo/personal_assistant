const express = require('express')
const InventoryController = require('./inventory.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateInventorySchema,
    createInventorySchema,
    getInventorySchema
} = require('./inventory.validations')

const router = express.Router()
const controller = new InventoryController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getInventorySchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createInventorySchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getInventorySchema, 'params'),
    validatorHandler(updateInventorySchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getInventorySchema, 'params'),
    controller.deleteOne
)

router.post('/findByName', 
    validatorHandler(updateInventorySchema, 'body'),
    controller.findItemByName
)

module.exports = router