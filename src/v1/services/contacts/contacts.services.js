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

    async findAll(user_id) {
        const contacts = await models.Contact.findAll({
            where: { user_id },
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
 
    async findByRut(rut, user_id) {
        const contact = await models.Contact.findOne({
            where: { '$person.rut$': rut, user_id },
            include: 'person'
        })
        return contact
    }

    async findByAlias(alias, user_id) {
        const contact = await models.Contact.findAll({
            where: { 
                alias: { [Op.like]: `%${alias}%` }, 
                user_id 
            },
            include: 'person'
        })
        return contact
    }      

    async findByEmail(email, user_id) {
        const contact = await models.Contact.findOne({
            where: { '$emails.address$': email, user_id },
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