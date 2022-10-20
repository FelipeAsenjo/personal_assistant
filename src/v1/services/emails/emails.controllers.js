const boom = require('@hapi/boom')
const EmailService = require('./emails.services')

const service = new EmailService()

class EmailController {
    async create(req, res, next) {
        const { body, user, params, fromContact } = req
        const data = fromContact ? 
            { ...body, contact_id: params.contact_id } :
            { ...body, user_id: user.id } 

        try {
            const emailExist = await service.findByAddress(body.address, user.id)
            if(emailExist) throw boom.conflict('email already exist')

            const newEmail = await service.create(data)
            res.status(201).json(newEmail)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        const { query, user } = req
        try {
            const emails = await service.findAll(query, user.id)
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

            res.status(200).json(email)
        } catch(error) {
            next(error)
        }
    }

    async findMyOwn(req, res, next) {
        try {
            const email = await service.findMyOwn(req.user.id)
            if(!email) throw boom.notFound('email not found')

            res.status(200).json(email)
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
            res.status(201).json(email)
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