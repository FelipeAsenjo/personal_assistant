const boom = require('@hapi/boom')
const AddressService = require('./address.services')

const service = new AddressService()

class AddressController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const addressExist = await service.findByContact(body.contact_id, user.id)
            if(addressExist) throw boom.conflict('address already exist')
            if(!body.contact_id) body.user_id = user.id

            const newAddress = await service.create(body)
            res.status(201).json(newAddress.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const addresses = await service.findAll(req.user.id)
            res.status(200).json(addresses.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const address = await service.findOne(params.id, user.id)
            if(!address) throw boom.notFound('address not found')

            res.status(200).json(address.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findMyOwn(req, res, next) {
        try {
            const addresses = await service.findMyOwn(req.user.id)
            if(!addresses) throw boom.notFound('address not found')

            res.status(200).json(addresses.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByContact(req, res, next) {
        const { body, user } = req
        try {
            const addresses = await service.findByContact(body.contact_id, user.id)
            if(!addresses) throw boom.notFound('address not found')

            res.status(200).json(addresses.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const addressExist = await service.findOne(id, req.user.id)
            if(!addressExist) throw boom.notFound('address not found')

            const address = await service.updateOne(id, req.body)
            res.status(201).json(address.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const addressExist = await service.findOne(id, req.user.id)
            if(!addressExist) throw boom.notFound('address not found')

            await service.deleteOne(id)
            res.status(204).json({ id, message: 'address deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = AddressController