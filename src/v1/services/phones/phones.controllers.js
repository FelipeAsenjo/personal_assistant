const boom = require('@hapi/boom')
const PhoneService = require('./phones.services')

const service = new PhoneService()

class PhoneController {
    async create(req, res, next) {
        const { body, user, params, fromContact } = req

        const data = fromContact ? 
            { ...body, contact_id: params.contact_id } :
            { ...body, user_id: user.id } 

        try {
            const phoneExist = await service.findByNumber(body.number, user.id)
            if(phoneExist) throw boom.conflict('phone already exist')

            const newPhone = await service.create(data)
            res.status(201).json(newPhone)
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

            res.status(200).json(phone)
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
        const { body, user, params, fromContact } = req

        const contactId = fromContact ?
            params.contact_id :
            body.contact_id

        try {
            const phones = await service.findByContact(contactId, user.id)
            if(!phones) throw boom.notFound('phone not found')

            res.status(200).json(phones)
        } catch(error) {
            next(error)
        }
    }

    async findByNumber(req, res, next) {
        const { body, user } = req
        try {
            const phones = await service.findByNumber(body.number, user.id)
            if(!phones) throw boom.notFound('phone not found')

            res.status(200).json(phones)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const phoneExist = await service.findOne(id, req.user.id)
            if(!phoneExist) throw boom.notFound('phone not found')

            const phone = await service.updateOne(id, req.body)
            res.status(201).json(phone)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const phoneExist = await service.findOne(id, req.user.id)
            if(!phoneExist) throw boom.notFound('phone not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'phone deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = PhoneController