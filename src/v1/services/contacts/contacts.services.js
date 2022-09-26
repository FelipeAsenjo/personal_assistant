const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ContactService {
    async create(data) {
        const newContact = await models.Contact.create(data, {include: 'person'})
        return newContact
    }

    async findAll() {
        const contacts = await models.Contact.findAll({include: 'person'})
        return contacts
    }

    async findOne(id) {
        const contact = await models.Contact.findByPk(id, {include: 'person'})
        return contact
    }
 
    async findByRut(rut) {
        const contact = await models.Contact.findOne({
            where: { '$person.rut$' : rut },
            include: 'person'
        })
        return contact
    }

    async findByAlias(alias) {
        const contact = await models.Contact.findOne({
            where: { alias },
            include: 'person'
        })
        return contact
    }      

    async findByEmail(email) {
        const contact = await models.Contact.findOne({
            where: { '$emails.address$' : email },
            include: 'person'
    })
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