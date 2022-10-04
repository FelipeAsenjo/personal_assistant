const express = require('express')
const SocialMediaController = require('./socialMedia.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateSocialMediaSchema,
    createSocialMediaSchema,
    getSocialMediaSchema
} = require('./socialMedia.validations')

const router = express.Router()
const controller = new SocialMediaController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getSocialMediaSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createSocialMediaSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getSocialMediaSchema, 'params'),
    validatorHandler(updateSocialMediaSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getSocialMediaSchema, 'params'),
    controller.deleteOne
)

module.exports = router