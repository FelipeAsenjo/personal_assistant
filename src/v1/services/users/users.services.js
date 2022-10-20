const { query } = require('express')
const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class UserService {
    async create(data) {
        const newUser = await models.User.create(data, {
            include: 'person'
        })
        return newUser
    }

    async findAll(query) {
        const users = await models.User.findAll({
            where: query,
            include: 'person'
        })
        return users
    }

    async findOne(id) {
        const user = await models.User.findByPk(id, {include: 'person'})
        return user
    }

    async updateOne(id, changes) {
        const { person, ...userChanges } = changes

        const user = await models.User.findByPk(id, { include: 'person' })
        if(person) await user.person.update(person)

        const updatedUser = await user.update(userChanges)
        return updatedUser
    }
    
    async deleteOne(id) {
        const user = await models.User.findByPk(id)
        await user.destroy()
        return id
    }
}

module.exports = UserService