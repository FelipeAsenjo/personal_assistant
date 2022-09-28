const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class EmailService {
    async create(data) {
        const newEmail = await models.Email.create(data, {include: 'person'})
        return newEmail
    }

    async findAll() {
        const emails = await models.Email.findAll({include: 'person'})
        return emails
    }

    async findOne(id) {
        const email = await models.Email.findByPk(id, { include: 'person' })
        return email
    }
 
    async findByAddress(emailAddress) {
        const email = await models.Email.findOne({
            where: { emailAddress },
            include: 'person'
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