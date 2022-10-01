const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class AddressService {
    async create(data) {
        const newAddress = await models.Address.create(data, {
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return newAddress
    }

    async findAll(user_id) {
        const phones = await models.Address.findAll({
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return phones
    }

    async findOne(id, user_id) {
        const phone = await models.Address.findByPk(id, {
            where: { user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return phone
    }
 
    async findMyOwn(user_id) {
        const phones = await models.Address.findAll({
            where: { user_id },
            include: 'person'
        })
        return phones
    }

    async findByContact(contact_id, user_id) {
        const phone = await models.Address.findAll({
            where: { contact_id, user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return phone
    }

    async findByNumber(number, user_id) {
        const phone = await models.Address.findOne({
            where: { number, user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return phone
    }   

    async updateOne(id, changes) {
        const user = await models.Address.findByPk(id)
        const updatedUser = user.update(changes)
        return updatedUser
    }
    
    async deleteOne(id) {
        const user = await models.Address.findByPk(id)
        user.destroy()
        return { id }
    }
}

module.exports = AddressService