const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class AddressService {
    async create(data) {
        const newAddress = await models.Address.create(data)
        return newAddress
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
            include: 'person'
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
        const updatedUser = address.update(changes)
        return updatedUser
    }
    
    async deleteOne(id) {
        const address = await models.Address.findByPk(id)
        address.destroy()
        return { id }
    }
}

module.exports = AddressService