const { Op } = require('sequelize')
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


class AddressService {
    async create(data) {
        const ownerAddress = await models.Address.create(data)
        return ownerAddress
    }

    async findAll(query, user_id) {
        const addresses = await models.Address.findAll({
            where: { '$contact.user_id$': user_id, ...query },
            include: includeContact(includePerson)
        })
        return addresses
    }

    async findOne(id, user_id) {
        const address = await models.Address.findByPk(id, {
            where: { '$contact.user_id$': user_id },
            include: includeContact(includePerson)
        })
        return address
    }
 
    async findMyOwn(user_id) {
        const addresses = await models.Address.findAll({
            where: { user_id },
            include: includeUser(includePerson)
        })
        return addresses
    }

    async updateOne(id, changes) {
        const address = await models.Address.findByPk(id)
        const updatedUser = await address.update(changes)
        return updatedUser
    }
    
    async deleteOne(id) {
        const address = await models.Address.findByPk(id)
        await address.destroy()
        return id
    }
}

module.exports = AddressService