const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { models } = sequelize

class SocialMediaService {
    async create(data) {
        const newSocialMedia = await models.SocialMedia.create(data, {include: 'person'})
        return newSocialMedia
    }

    async findAll(user_id) {
        const socialMedia = await models.SocialMedia.findAll({
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return socialMedia
    }

    async findOne(id, user_id) {
        const socialMedia = await models.SocialMedia.findByPk(id, {
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }           
        })
        return socialMedia
    }
 
    async findByUsername(username, user_id) {
        const socialMedia = await models.SocialMedia.findOne({
            where: { '$contact.user_id$': user_id, username },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
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