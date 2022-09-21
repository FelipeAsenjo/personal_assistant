const boom = require('@hapi/boom')
const ContactService = require('./contacts.services')

const service = new ContactService()

class ContactController {
    async create(req, res, next) {
        const { body } = req
        try {
            // const contactExist = await service.findByAlias(body.alias)
            const contactExist = await this.findContact(body)
            if(contactExist) throw boom.conflict('contact already exist')

            const newContact = await service.create(body)

            res.status(201).json(newContact)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const contact = await service.findAll()
            res.status(200).json(contact)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        try {
            const { id } = req.params
            const contact = id ? await service.findOne(id) : this.findContact(req.body)
            if(!contact) throw boom.notFound('contact not found')

            res.status(200).json(contact.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const contactExist = await service.findOne(id)
            if(!contactExist) throw boom.notFound('contact not found')

            const contact = await service.updateOne(id, req.body)
            res.status(201).json(contact.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const contactExist = id ? await service.findOne(id) : await this.findContact(req.body)
            if(!contactExist) throw boom.notFound('contact not found')

            await service.deleteOne(id)
            res.status(204).json({ id, message: 'contact deleted' })
        } catch(error) {
            next(error)
        }
    }

    async findContact(body) {
        const { rut, email, alias } = body
        const contactExist = async () => {
            try {
                if(rut) {
                    const contactByRut = await service.findByRut(rut)
                    return contactByRut
                } 
                if(email) {
                    const contactByEmail = await service.findByEmail(email)
                    return contactByEmail
                } 
                if(alias) {
                    const contactByAlias = await service.findByAlias(alias)
                    return contactByAlias
                } 
            } catch(error) {
                next(error)
            }
        }

        return contactExist
    }
}

module.exports = ContactController