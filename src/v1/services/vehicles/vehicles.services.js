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


class VehicleService {
    async create(data) {
        const newVehicle = await models.Vehicle.create(data, {
            include: includeContact(includePerson)
        })
        return newVehicle
    }

    async findAll(query, user_id) {
        const vehicles = await models.Vehicle.findAll({
            where: { '$contact.user_id$': user_id, ...query },
            include: includeContact(includePerson)
        })
        return vehicles
    }

    async findOne(id, user_id) {
        const vehicle = await models.Vehicle.findByPk(id, {
            where: { '$contact.user_id$': user_id },
            include: includeContact(includePerson)
        })
        return vehicle
    }
 
    async findMyOwn(user_id) {
        const vehicles = await models.Vehicle.findAll({
            where: { user_id },
            include: includeUser(includePerson)
        })
        return vehicles
    }

    async updateOne(id, changes) {
        const vehicle = await models.Vehicle.findByPk(id)
        const updatedVehicle = await vehicle.update(changes)
        return updatedVehicle
    }
    
    async deleteOne(id) {
        const vehicle = await models.Vehicle.findByPk(id)
        await vehicle.destroy()
        return id
    }
}

module.exports = VehicleService