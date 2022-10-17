const { sequelize } = require('../../../libs/sequelize/connection')
const { Person } = require('../../../libs/sequelize/models/people.model')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { User } = require('../../../libs/sequelize/models/users.model')
const { Op } = require('sequelize')
const { models } = sequelize

const userAttributes = ['id', 'username']
const contactAttributes = ['alias']
const personAttributes = ['id', 'name', 'last_name', 'rut']

const includePerson = {
    model: Person,
    as: 'person',
    attributes: personAttributes
}

const includeContact = (person) => ({
    model: Contact,
    as: 'contact',
    attributes: contactAttributes,
    include: person
})

const includeUser = (person) => ({
    model: User,
    as: 'user',
    attributes: userAttributes,
    include: person
})


class EmailService {
    async create(data) {
        const newEmail = await models.Email.create(data, {
            include: includeContact(includePerson)
        })
        return newEmail
    }

    async findAll(user_id) {
        const emails = await models.Email.findAll({
            where: { '$contact.user_id$': user_id },
            include: includeContact(includePerson)
        })
        return emails
    }

    async findOne(id, user_id) {
        const email = await models.Email.findByPk(id, {
            where: { user_id },
            include: includeContact(includePerson)
        })
        return email
    }
 
    async findMyOwn(user_id) {
        const emails = await models.Email.findAll({
            where: { user_id },
            include: includeUser(includePerson)
        })
        return emails
    }

    async findByAddress(address, user_id) {
        const email = await models.Email.findAll({
            where: { 
                '$contact.user_id$': user_id, 
                address: { [Op.like]: `%${address}%` }
            },
            include: includeContact(includePerson)
        })
        return email
    }

    async findByContact(contact_id, user_id) {
        const email = await models.Email.findAll({
            where: { '$contact.user_id$': user_id, contact_id },
            include: includeContact(includePerson)
        })
        return email
    }

    async updateOne(id, changes) {
        const email = await models.Email.findByPk(id)
        const updatedEmail = await email.update(changes)
        return updatedEmail
    }
    
    async deleteOne(id) {
        const email = await models.Email.findByPk(id)
        await email.destroy()
        return id
    }
}

module.exports = EmailService