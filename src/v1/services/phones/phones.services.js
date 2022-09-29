const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { models } = sequelize

class PhoneService {
    async create(data) {
        const newPhone = await models.Phone.create(data, {
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return newPhone
    }

    async findAll(user_id) {
        const phones = await models.Phone.findAll({
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
        const phone = await models.Phone.findByPk(id, {
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
        const phones = await models.Phone.findAll({
            where: { user_id },
            include: 'person'
        })
        return phones
    }

    async findByContact(contact_id, user_id) {
        const phone = await models.Phone.findOne({
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
        const phone = await models.Phone.findOne({
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
        const user = await models.Phone.findByPk(id)
        const updatedUser = user.update(changes)
        return updatedUser
    }
    
    async deleteOne(id) {
        const user = await models.Phone.findByPk(id)
        user.destroy()
        return { id }
    }
}

module.exports = PhoneService