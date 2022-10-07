const boom = require('@hapi/boom')
const ContactService = require('./contacts.services')

const service = new ContactService()

class ContactController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const contactExist = await searchByMulti(body.person, user.id)
            if(contactExist) return res.status(200).json({
                message: 'contact already exist',
                ...contactExist
            })

            const newContact = await service.create({ ...body, user_id: user.id })
            res.status(201).json(newContact)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const contact = await service.findAll(req.user.id)
            res.status(200).json(contact)
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

            res.status(200).json(contact.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findContact(req, res, next) {
        const { body, user } = req
        try {
            const contact = await searchByMulti(body, user.id)
            if(!contact) throw boom.notFound('contact not found')

            res.status(200).json(contact.dataValues)
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
            res.status(201).json(contact.dataValues)
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

const searchByMulti = async (contact, user_id) => {
    const { rut, email, alias } = contact
    // const contactData = contact.rut || contact.email || contact.alias
    const contactExist = async () => {
        try {
            if(rut) {
                const contactByRut = await service.findByRut(rut, user_id)
                if(!contactByRut) throw boom.notFound('contact not found')
                return contactByRut.dataValues
            } 
            if(email) {
                const contactByEmail = await service.findByEmail(email, user_id)
                if(!contactByEmail) throw boom.notFound('contact not found')
                return contactByEmail.dataValues
            } 
            if(alias) {
                const contactByAlias = await service.findByAlias(alias, user_id)
                if(!contactByAlias) throw boom.notFound('contact not found')
                return contactByAlias.dataValues
            } 

            return false
        } catch(error) {
            next(error)
        }
    }

    return contactExist()
}

module.exports = ContactController