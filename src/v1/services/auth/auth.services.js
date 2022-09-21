const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class AuthService {
    async findByEmail(username) {
        const user = await models.User.findOne({where: { username }})
        return user
    }
}

module.exports = AuthService