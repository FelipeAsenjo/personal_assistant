const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { Person } = require('../../../libs/sequelize/models/people.model')
const { User } = require('../../../libs/sequelize/models/users.model')
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


class PhoneService {
    async create(data) {
        const newPhone = await models.Phone.create(data, {
            include: includeContact(includePerson)
        })
        return newPhone
    }

    async findAll(query, user_id) {
        const phones = await models.Phone.findAll({
            where: { '$contact.user_id$': user_id, ...query },
            include: includeContact(includePerson)
        })
        return phones
    }

    async findOne(id, user_id) {
        const phone = await models.Phone.findByPk(id, {
            where: { '$contact.user_id$': user_id },
            include: includeContact(includePerson)
        })
        return phone
    }
 
    async findMyOwn(user_id) {
        const phones = await models.Phone.findAll({
            where: { user_id },
            include: includeUser(includePerson)
        })
        return phones
    }

    async updateOne(id, changes) {
        const phone = await models.Phone.findByPk(id)
        const updatedUser = await phone.update(changes)
        return updatedUser
    }
    
    async deleteOne(id) {
        const phone = await models.Phone.findByPk(id)
        await phone.destroy()
        return id
    }
}

module.exports = PhoneService