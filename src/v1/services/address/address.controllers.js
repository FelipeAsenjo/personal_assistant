const boom = require('@hapi/boom')
const PhoneService = require('./address.services')

const service = new PhoneService()

class PhoneController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const phoneExist = await service.findByNumber(body.number)
            if(phoneExist) throw boom.conflict('phone already exist')
            if(!body.contact_id) body.user_id = user.id

            const newPhone = await service.create(body)
            res.status(201).json(newPhone.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const phones = await service.findAll(req.user.id)
            res.status(200).json(phones)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const phone = await service.findOne(params.id, user.id)
            if(!phone) throw boom.notFound('phone not found')

            res.status(200).json(user.id)
        } catch(error) {
            next(error)
        }
    }

    async findMyOwn(req, res, next) {
        try {
            const phones = await service.findMyOwn(req.user.id)
            if(!phones) throw boom.notFound('phone not found')

            res.status(200).json(phones)
        } catch(error) {
            next(error)
        }
    }

    async findByContact(req, res, next) {
        const { body, user } = req
        try {
            const phones = await service.findMyOwn(body.contact_id, user.id)
            if(!phones) throw boom.notFound('phone not found')

            res.status(200).json(phones)
        } catch(error) {
            next(error)
        }
    }

    async findByNumber(req, res, next) {
        const { body, user } = req
        try {
            const phones = await service.findMyOwn(body.number, user.id)
            if(!phones) throw boom.notFound('phone not found')

            res.status(200).json(phones)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const phoneExist = await service.findOne(id)
            if(!phoneExist) throw boom.notFound('phone not found')

            const phone = await service.updateOne(id, req.body)
            res.status(201).json(phone.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const phoneExist = await service.findOne(id)
            if(!phoneExist) throw boom.notFound('phone not found')

            await service.deleteOne(id)
            res.status(204).json({ id, message: 'phone deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = PhoneController