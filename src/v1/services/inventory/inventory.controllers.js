const boom = require('@hapi/boom')
const InventoryService = require('./inventory.services')

const service = new InventoryService()

class InventoryController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const newItem = await service.create({ ...body, user_id: user.id })
            res.status(201).json(newItem)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const inventory = await service.findAll(req.user.id)
            res.status(200).json(inventory)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const item = await service.findOne(params.id, user.id)
            if(!item) throw boom.notFound('item not found')

            res.status(200).json(item)
        } catch(error) {
            next(error)
        }
    }

    async findItemByName(req, res, next) {
        const { body, user } = req
        try {
            const item = await service.findItemByName(body.item_name, user.id)
            if(!item) throw boom.notFound('item not found')

            res.status(200).json(item)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const itemExist = await service.findOne(id, req.user.id)
            if(!itemExist) throw boom.notFound('item not found')

            const item = await service.updateOne(id, req.body)
            res.status(201).json(item)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const itemExist = await service.findOne(id, req.user.id)
            if(!itemExist) throw boom.notFound('item not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'item deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = InventoryController