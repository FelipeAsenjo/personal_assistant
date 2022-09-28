const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class VehicleService {
    async create(data) {
        const newVehicle = await models.Vehicle.create(data, {include: 'person'})
        return newVehicle
    }

    async findAll() {
        const vehicles = await models.Vehicle.findAll({include: 'person'})
        return vehicles
    }

    async findOne(id) {
        const vehicle = await models.Vehicle.findByPk(id, { include: 'person' })
        return vehicle
    }
 
    async findByPlateNumber(plate_number) {
        const vehicle = await models.Vehicle.findOne({
            where: { plate_number },
            include: 'person'
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