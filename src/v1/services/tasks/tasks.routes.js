const express = require('express')
const TaskController = require('./tasks.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateTaskSchema,
    createTaskSchema,
    getTaskSchema
} = require('./tasks.validations')

const router = express.Router()
const controller = new TaskController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getTaskSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createTaskSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getTaskSchema, 'params'),
    validatorHandler(updateTaskSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getTaskSchema, 'params'),
    controller.deleteOne
)

module.exports = router