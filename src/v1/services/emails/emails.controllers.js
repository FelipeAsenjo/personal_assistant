const boom = require('@hapi/boom')
const EmailService = require('./emails.services')

const service = new EmailService()

class EmailController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const emailExist = await service.findByAddress(body.address, user.id)
            if(emailExist) throw boom.conflict('email already exist')
            if(!body.contact_id) body.user_id = user.id

            const newEmail = await service.create(body)
            res.status(201).json(newEmail.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const emails = await service.findAll(req.user.id)
            res.status(200).json(emails)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const email = await service.findOne(params.id, user.id)
            if(!email) throw boom.notFound('email not found')

            res.status(200).json(email.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findMyOwn(req, res, next) {
        try {
            const email = await service.findMyOwn(req.user.id)
            if(!email) throw boom.notFound('email not found')

            res.status(200).json(email.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByAddress(req, res, next) {
        const { user, body } = req
        try {
            const email = await service.findByAddress(body.address, user.id)
            if(!email) throw boom.notFound('email not found')

            res.status(200).json(email.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByContact(req, res, next) {
        const { user, body } = req
        try {
            const email = await service.findByContact(body.contact_id, user.id)
            if(!email) throw boom.notFound('email not found')

            res.status(200).json(email.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const emailExist = await service.findOne(id, req.user.id)
            if(!emailExist) throw boom.notFound('email not found')

            const email = await service.updateOne(id, req.body)
            res.status(201).json(email.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const emailExist = await service.findOne(id, req.user.id)
            if(!emailExist) throw boom.notFound('email not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'email deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = EmailController