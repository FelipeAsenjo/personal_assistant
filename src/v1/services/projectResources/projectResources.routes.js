const express = require('express')
const ProjectResourcesController = require('./projectResources.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateProjectResourcesSchema,
    createProjectResourcesSchema,
    getProjectResourcesSchema
} = require('./projectResources.validations')

const router = express.Router()
const controller = new ProjectResourcesController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getProjectResourcesSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createProjectResourcesSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getProjectResourcesSchema, 'params'),
    validatorHandler(updateProjectResourcesSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getProjectResourcesSchema, 'params'),
    controller.deleteOne
)

module.exports = router