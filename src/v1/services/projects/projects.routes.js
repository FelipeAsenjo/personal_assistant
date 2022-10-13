const express = require('express')
const ProjectController = require('./projects.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const resourcesRoutes = require('../projectResources/projectResources.routes')
const { 
    updateProjectSchema,
    createProjectSchema,
    getProjectSchema
} = require('./projects.validations')

const router = express.Router()
const controller = new ProjectController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getProjectSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createProjectSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getProjectSchema, 'params'),
    validatorHandler(updateProjectSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getProjectSchema, 'params'),
    controller.deleteOne
)

router.post('/findByName', 
    validatorHandler(updateProjectSchema, 'body'),
    controller.findByProjectName
)

module.exports = router