const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class UserService {
    async create(data) {
        const newUser = await models.User.create(data)
        return newUser
    }

    async findAll() {
        const users = await models.User.findAll()
        return users
    }

    async findOne(id) {
        const user = await models.User.findByPk(id)
        return user
    }
 
    async findByEmail(email) {
        const user = await models.User.findOne({where: { email }})
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