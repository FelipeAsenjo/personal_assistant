const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { User } = require('../../../libs/sequelize/models/users.model')
const { models } = sequelize

class EmailService {
    async create(data) {
        const newEmail = await models.Email.create(data, {
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return newEmail
    }

    async findAll(user_id) {
        const emails = await models.Email.findAll({
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return emails
    }

    async findOne(id, user_id) {
        const email = await models.Email.findByPk(id, {
            where: { user_id },
        })
        return email
    }
 
    async findMyOwn(user_id) {
        const emails = await models.Email.findAll({
            where: { user_id },
            include: {
                model: User,
                as: 'user',
                include: 'person'
            }
        })
        return emails
    }

    async findByAddress(address, user_id) {
        const email = await models.Email.findOne({
            where: { '$contact.user_id$': user_id, address },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return email
    }

    async findByContact(contact_id, user_id) {
        const email = await models.Email.findAll({
            where: { '$contact.user_id$': user_id, contact_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return email
    }

    async updateOne(id, changes) {
        const email = await models.Email.findByPk(id)
        const updatedEmail = email.update(changes)
        return updatedEmail
    }
    
    async deleteOne(id) {
        const email = await models.Email.findByPk(id)
        email.destroy()
        return { id }
    }
}

module.exports = EmailService