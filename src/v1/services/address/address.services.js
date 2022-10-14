const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { User } = require('../../../libs/sequelize/models/users.model')
const { models } = sequelize

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
                include: 'person'
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
                include: 'person'
            }
        })
        return address
    }
 
    async findMyOwn(user_id) {
        const addresses = await models.Address.findAll({
            where: { user_id },
        })
        return addresses
    }

    async findByContact(contact_id, user_id) {
        const address = await models.Address.findAll({
            where: { '$contact.user_id$': user_id, contact_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
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