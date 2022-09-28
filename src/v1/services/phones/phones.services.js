const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class PhoneService {
    async create(data) {
        const newPhone = await models.Phone.create(data, {include: 'person'})
        return newPhone
    }

    async findAll(person_id) {
        const phones = await models.Phone.findAll({where: { person_id }, include: 'person'})
        return phones
    }

    async findOne(id) {
        const phone = await models.Phone.findByPk(id, { include: 'person' })
        return phone
    }
 
    async findByNumber(phoneNumber) {
        const phone = await models.Phone.findOne({
            where: { phoneNumber },
            include: 'person'
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