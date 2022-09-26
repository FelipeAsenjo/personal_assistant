const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class UserService {
    async create(data) {
        const newUser = await models.User.create(data, {include: 'person'})
        return newUser
    }

    async findAll() {
        const users = await models.User.findAll({include: 'person'})
        return users
    }

    async findOne(id) {
        const user = await models.User.findByPk(id, { include: 'person' })
        return user
    }
 
    async findByUsername(username) {
        const user = await models.User.findOne({
            where: { username },
            include: 'person'
        })
        return user
    }   

    async findByRut(rut) {
        const user = await models.User.findOne({
            where: { '$person.rut$' : rut },
            include: 'person'
        })
        return user
    }

    async updateOne(id, changes) {
        const user = await models.User.findByPk(id)
        const updatedUser = user.update(changes)
        return updatedUser
    }
    
    async deleteOne(id) {
        const user = await models.User.findByPk(id)
        user.destroy()
        return { id }
    }
}

module.exports = UserService