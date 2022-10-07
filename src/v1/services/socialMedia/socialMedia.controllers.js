const boom = require('@hapi/boom')
const SocialMediaService = require('./socialMedia.services')

const service = new SocialMediaService()

class SocialMediaController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const socialMediaExist = await service.findByUsername(body.username)
            if(socialMediaExist) throw boom.conflict('social media already exist')
            if(!body.contact_id) body.user_id = user.id

            const newSocialMedia = await service.create(body)
            res.status(201).json(newSocialMedia.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const socialMedia = await service.findAll(req.user.id)
            res.status(200).json(socialMedia)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const socialMedia = await service.findOne(params.id, user.id)
            if(!socialMedia) throw boom.notFound('social media not found')

            res.status(200).json(socialMedia.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByUsername(req, res, next) {
        const { body, user } = req
        try {
            const socialMedia = await service.findByUsername(body.username, user.id)
            if(!socialMedia) throw boom.notFound('social media not found')

            res.status(200).json(socialMedia.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByContact(req, res, next) {
        const { body, user } = req
        try {
            const socialMedia = await service.findByContact(body.contactId, user.id)
            if(!socialMedia) throw boom.notFound('social media not found')

            res.status(200).json(socialMedia.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const socialMediaExist = await service.findOne(id, req.user.id)
            if(!socialMediaExist) throw boom.notFound('social media not found')

            const socialMedia = await service.updateOne(id, req.body)
            res.status(201).json(socialMedia.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const socialMediaExist = await service.findOne(id, req.user.id)
            if(!socialMediaExist) throw boom.notFound('social media not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'social media deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = SocialMediaController