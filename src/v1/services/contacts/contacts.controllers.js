const boom = require('@hapi/boom')
const ContactService = require('./contacts.services')
const { searchByMulti } = require('../../../utils/finders.utils')

const service = new ContactService()

class ContactController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const contactExist = await searchByMulti(service, body.person, user.id)
            if(contactExist) return res.status(200).json({
                error: {
                    message: 'contact already exist',
                    type: 409
                },
                ...contactExist.dataValues
            })

            const newContact = await service.create({ ...body, user_id: user.id })
            res.status(201).json(newContact)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        const { query, user } = req
        try {
            const contacts = await service.findAll(query, user.id)
            res.status(200).json(contacts)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { id } = req.params
        try {
            const contact = id ?
                await service.findOne(id, req.user.id) : 
                await this.findContact(req.body, req.user.id)
            if(!contact) throw boom.notFound('contact not found')

            res.status(200).json(contact)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const contactExist = await service.findOne(id, req.user.id)
            if(!contactExist) throw boom.notFound('contact not found')

            const contact = await service.updateOne(id, req.body)
            res.status(201).json(contact)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const contactExist = id ?
                await service.findOne(id, req.user.id) :
                await this.findContact(req.body, req.user.id)
            if(!contactExist) throw boom.notFound('contact not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'contact deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = ContactController