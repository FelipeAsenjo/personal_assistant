const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class AuthService {
    async findByEmail(email) {
        const user = await models.User.findOne({where: { email }})
        return user
    }
}

module.exports = AuthService