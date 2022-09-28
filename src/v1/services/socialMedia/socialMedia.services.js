const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class SocialMediaService {
    async create(data) {
        const newSocialMedia = await models.SocialMedia.create(data, {include: 'person'})
        return newSocialMedia
    }

    async findAll(user_id) {
        const socialMedia = await models.SocialMedia.findAll({where: { user_id }, include: 'person'})
        return socialMedia
    }

    async findOne(id) {
        const socialMedia = await models.SocialMedia.findByPk(id, { include: 'person' })
        return socialMedia
    }
 
    async findByUsername(username) {
        const socialMedia = await models.SocialMedia.findOne({
            where: { username },
            include: 'person'
        })
        return socialMedia
    }

    async updateOne(id, changes) {
        const socialMedia = await models.SocialMedia.findByPk(id)
        const updatedSocialMedia = socialMedia.update(changes)
        return updatedSocialMedia
    }
    
    async deleteOne(id) {
        const socialMedia = await models.SocialMedia.findByPk(id)
        socialMedia.destroy()
        return { id }
    }
}

module.exports = SocialMediaService