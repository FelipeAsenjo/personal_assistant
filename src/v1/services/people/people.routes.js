const express = require('express')
const PeopleController = require('./people.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updatePersonSchema,
    createPersonSchema,
    getPersonSchema
} = require('./people.validations')

const router = express.Router()
const controller = new PeopleController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getPersonSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createPersonSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getPersonSchema, 'params'),
    validatorHandler(updatePersonSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getPersonSchema, 'params'),
    controller.deleteOne
)

module.exports = router