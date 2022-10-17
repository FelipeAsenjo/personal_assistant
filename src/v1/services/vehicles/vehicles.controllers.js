const boom = require('@hapi/boom')
const VehicleService = require('./vehicles.services')

const service = new VehicleService()

class VehicleController {
    async create(req, res, next) {
        const { body, user, params, fromContact } = req

        const data = fromContact ? 
            { ...body, contact_id: params.contact_id } :
            { ...body, user_id: user.id } 

        try {
            const newVehicle = await service.create(data)
            res.status(201).json(newVehicle)
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
        const { params, user } = req
        try {
            const vehicle = await service.findOne(params.id, user.id)
            if(!vehicle) throw boom.notFound('vehicle not found')

            res.status(200).json(vehicle)
        } catch(error) {
            next(error)
        }
    }

    async findMyOwn(req, res, next) {
        try {
            const vehicle = await service.findMyOwn(req.user.id)
            if(!vehicle) throw boom.notFound('vehicle not found')

            res.status(200).json(vehicle)
        } catch(error) {
            next(error)
        }
    }

    async findByPlateNumber(req, res, next) {
        const { body, user } = req
        try {
            const vehicle = await service.findByPlateNumber(body.plate_number, user.id)
            if(!vehicle) throw boom.notFound('vehicle not found')

            res.status(200).json(vehicle)
        } catch(error) {
            next(error)
        }
    }

    async findByContact(req, res, next) {
        const { body, user, fromContact, params } = req

        const contactId = fromContact ?
            params.contact_id :
            body.contact_id

        try {
            const vehicle = await service.findByContact(contactId, user.id)
            if(!vehicle) throw boom.notFound('vehicle not found')

            res.status(200).json(vehicle)
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
            res.status(201).json(vehicle)
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