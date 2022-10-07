const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { models } = sequelize

class VehicleService {
    async create(data) {
        const newVehicle = await models.Vehicle.create(data, {
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return newVehicle
    }

    async findAll(user_id) {
        const vehicles = await models.Vehicle.findAll({
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return vehicles
    }

    async findOne(id) {
        const vehicle = await models.Vehicle.findByPk(id)
        return vehicle
    }
 
    async findMyOwn(user_id) {
        const vehicles = await models.Vehicle.findAll({
            where: { user_id },
        })
        return vehicles
    }

    async findByPlateNumber(plate_number, user_id) {
        const vehicle = await models.Vehicle.findOne({
            where: { '$contact.user_id$': user_id, plate_number },
            include: 'person'
        })
        return vehicle
    }   

    async findByContact(contact_id, user_id) {
        const vehicle = await models.Vehicle.findAll({
            where: { '$contact.user_id$': user_id, contact_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return vehicle
    }

    async updateOne(id, changes) {
        const vehicle = await models.Vehicle.findByPk(id)
        const updatedVehicle = vehicle.update(changes)
        return updatedVehicle
    }
    
    async deleteOne(id) {
        const vehicle = await models.Vehicle.findByPk(id)
        vehicle.destroy()
        return { id }
    }
}

module.exports = VehicleService