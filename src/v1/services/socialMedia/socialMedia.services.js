const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { Person } = require('../../../libs/sequelize/models/people.model')
const { User } = require('../../../libs/sequelize/models/users.model')
const { models } = sequelize

const userAttributes = ['id', 'username']
const contactAttributes = ['alias']
const personAttributes = ['id', 'name', 'last_name', 'rut']

const includePerson = {
    model: Person,
    as: 'person',
    attributes: personAttributes
}

const includeContact = (person) => ({
    model: Contact,
    as: 'contact',
    attributes: contactAttributes,
    include: person
})

const includeUser = (person) => ({
    model: User,
    as: 'user',
    attributes: userAttributes,
    include: person
})


class SocialMediaService {
    async create(data) {
        const newSocialMedia = await models.SocialMedia.create(data, {
            include: includeContact(includePerson)
        })
        return newSocialMedia
    }

    async findAll(query, user_id) {
        const socialMedia = await models.SocialMedia.findAll({
            where: { '$contact.user_id$': user_id, ...query },
            include: includeContact(includePerson)
        })
        return socialMedia
    }

    async findOne(id, user_id) {
        const socialMedia = await models.SocialMedia.findByPk(id, {
            where: { '$contact.user_id$': user_id },
            include: includeContact(includePerson)
        })
        return socialMedia
    }
 
    async findMyOwn(user_id) {
        const socialMedia = await models.SocialMedia.findAll({
            where: { user_id },
            include: includeUser(includePerson)
        })
        return socialMedia
    }

    async updateOne(id, changes) {
        const socialMedia = await models.SocialMedia.findByPk(id)
        const updatedSocialMedia = await socialMedia.update(changes)
        return updatedSocialMedia
    }
    
    async deleteOne(id) {
        const socialMedia = await models.SocialMedia.findByPk(id)
        await socialMedia.destroy()
        return id
    }
}

module.exports = SocialMediaService