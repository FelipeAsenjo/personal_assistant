const boom = require('@hapi/boom')
const VehicleService = require('./vehicles.services')

const service = new VehicleService()

class VehicleController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const vehicleExist = await service.findByPlateNumber(body.plate_number, user.id)
            if(vehicleExist) throw boom.conflict('vehicle already exist')
            if(!body.contact_id) body.user_id = user.id

            const newVehicle = await service.create(body)
            res.status(201).json(newVehicle.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const vehicles = await service.findAll(req.user.id)
            res.status(200).json(vehicles)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params } = req
        try {
            const vehicle = await service.findOne(params.id)
            if(!vehicle) throw boom.notFound('vehicle not found')

            res.status(200).json(vehicle.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findMyOwn(req, res, next) {
        try {
            const vehicle = await service.findMyOwn(req.user.id)
            if(!vehicle) throw boom.notFound('vehicle not found')

            res.status(200).json(vehicle.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByPlateNumber(req, res, next) {
        const { body, user } = req
        try {
            const vehicle = await service.findByPlateNumber(body.plate_number, user.id)
            if(!vehicle) throw boom.notFound('vehicle not found')

            res.status(200).json(vehicle.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { body, params } = req
        try {
            const vehicleExist = await service.findOne(params.id)
            if(!vehicleExist) throw boom.notFound('vehicle not found')

            const vehicle = await service.updateOne(params.id, body)
            res.status(201).json(vehicle.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const vehicleExist = await service.findOne(id)
            if(!vehicleExist) throw boom.notFound('vehicle not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'vehicle deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = VehicleController