const express = require('express')
const VehicleController = require('./vehicles.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateVehicleSchema,
    createVehicleSchema,
    getVehicleSchema
} = require('./vehicles.validations')

const router = express.Router({mergeParams: true})
const controller = new VehicleController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getVehicleSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createVehicleSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getVehicleSchema, 'params'),
    validatorHandler(updateVehicleSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getVehicleSchema, 'params'),
    controller.deleteOne
)

router.post('/findMyOwn', controller.findMyOwn)

router.post('/findByPlateNumber', 
    validatorHandler(updateVehicleSchema, 'body'),
    controller.findByPlateNumber
)

router.post('/findByContact', controller.findByContact)

module.exports = router