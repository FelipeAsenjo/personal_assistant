const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ContactService {
    async create(data) {
        const newContact = await models.Contact.create(data)
        return newContact
    }

    async findAll() {
        const contacts = await models.Contact.findAll()
        return contacts
    }

    async findOne(id) {
        const contact = await models.Contact.findByPk(id)
        return contact
    }
 
    async findByRut(rut) {
        const contact = await models.User.findOne({where: { rut }})
        return contact
    }

    async findByAlias(alias) {
        const contact = await models.Contact.findOne({where: { alias }})
        return contact
    }      

    async findByEmail(email) {
        const contact = await models.Contact.findOne({where: { email }})
        return contact
    }

    async updateOne(id, changes) {
        const contact = await models.Contact.findByPk(id)
        const updatedUser = contact.update(changes)
        return updatedUser
    }
    
    async deleteOne(id) {
        const contact = await models.Contact.findByPk(id)
        contact.destroy()
        return { id }
    }
}

module.exports = ContactService