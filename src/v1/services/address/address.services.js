const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { Person } = require('../../../libs/sequelize/models/people.model')
const { User } = require('../../../libs/sequelize/models/users.model')
const { models } = sequelize

const userAttributes = ['id', 'username']
const contactAttributes = ['alias']
const personAttributes = ['id', 'name', 'last_name', 'rut']

class AddressService {
    async create(data) {
        const ownerAddress = await models.Address.create(data)
        return ownerAddress
    }

    async findAll(user_id) {
        const addresses = await models.Address.findAll({
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                attributes: contactAttributes,
                include: {
                    model: Person,
                    as: 'person',
                    attributes: personAttributes
                }
            }
        })
        return addresses
    }

    async findOne(id, user_id) {
        const address = await models.Address.findByPk(id, {
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                attributes: contactAttributes,
                include: {
                    model: Person,
                    as: 'person',
                    attributes: personAttributes
                }
            }
        })
        return address
    }
 
    async findMyOwn(user_id) {
        const addresses = await models.Address.findAll({
            where: { user_id },
            include: {
                model: User,
                as: 'user',
                attributes: userAttributes,
                include: {
                    model: Person,
                    as: 'person',
                    attributes: personAttributes
                }
            }
        })
        return addresses
    }

    async findByContact(contact_id, user_id) {
        const address = await models.Address.findAll({
            where: { '$contact.user_id$': user_id, contact_id },
            include: {
                model: Contact,
                as: 'contact',
                attributes: contactAttributes,
                include: {
                    model: Person,
                    as: 'person',
                    attributes: personAttributes
                }
            }
        })
        return address
    }

    async findByRut(rut, user_id) {
        const address = await models.Address.findOne({
            where: { '$person.rut$': rut, user_id },
            include: {
                model: Contact,
                as: 'contact',
                attributes: contactAttributes,
                include: {
                    model: Person,
                    as: 'person',
                    attributes: personAttributes
                }
            }
        })
        return address
    }

    async findByAlias(alias, user_id) {
        const address = await models.Address.findAll({
            where: { 
                [Op.and]: {
                    '$contact.alias$': { [Op.like]: `%${alias}%` }, 
                    '$contact.user_id$': user_id 
                }
            },
            include: {
                model: Contact,
                as: 'contact',
                attributes: contactAttributes,
                include: {
                    model: Person,
                    as: 'person',
                    attributes: personAttributes
                }
            }
        })
        return address
    }      

    async findByEmail(email, user_id) {
        const address = await models.Address.findOne({
            where: { '$emails.address$': email, user_id },
            include: {
                model: Contact,
                as: 'contact',
                attributes: contactAttributes,
                include: {
                    model: Person,
                    as: 'person',
                    attributes: personAttributes
                }
            }
        })
        return address
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