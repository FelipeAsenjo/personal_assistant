const boom = require('@hapi/boom')
const WishlistService = require('./wishlist.services')

const service = new WishlistService()

class WishlistController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const newWish = await service.create({ ...body, user_id: user.id })
            res.status(201).json(newWish)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        const { query, user } = req
        try {
            const wishes = await service.findAll(query, user.id)
            res.status(200).json(wishes)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const wish = await service.findOne(params.id, user.id)
            if(!wish) throw boom.notFound('wish not found')

            res.status(200).json(wish)
        } catch(error) {
            next(error)
        }
    }
    
    async updateOne(req, res, next) {
        const { params, user } = req
        try {
            const wishExist = await service.findOne(params.id, user.id)
            if(!wishExist) throw boom.notFound('wish not found')

            const wish = await service.updateOne(params.id, req.body)
            res.status(201).json(wish)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const wishExist = await service.findOne(id, req.user.id)
            if(!wishExist) throw boom.notFound('wish not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'wish deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = WishlistController