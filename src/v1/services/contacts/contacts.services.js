const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ContactService {
    async create(data) {
        const newContact = await models.Contact.create(data, {
            include: 'person'
        })
        return newContact
    }

    async findAll(query, user_id) {
        const contacts = await models.Contact.findAll({
            where: { ...query, user_id },
            include: 'person'
        })
        return contacts
    }

    async findOne(id, user_id) {
        const contact = await models.Contact.findByPk(id, {
            where: { user_id },
            include: 'person'
        })
        return contact
    }

    async updateOne(id, changes) {
        const { person, ...contactChanges } = changes

        const contact = await models.Contact.findByPk(id, { include: 'person' })
        if(person) await contact.person.update(person)

        const updatedContact = await contact.update(contactChanges)
        return updatedContact
    }
    
    async deleteOne(id) {
        const contact = await models.Contact.findByPk(id)
        await contact.destroy()
        return id
    }
}

module.exports = ContactService