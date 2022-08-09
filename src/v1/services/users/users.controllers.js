const UserService = require('./users.services')

const service = new UserService()

class UserController {
    async create(req, res, next) {
        try {
            const body = req.body
            const newUser = await service.create(body)
            res.status(201).json(newUser)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            res.send('estamos bien perejil')
            // const users = await service.findAll()
            // res.json(users)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        try {
            const { id } = req.params
            const user = await service.findOne(id)
            res.json(user)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const body = req.body
            const user = await service.update(id, body)
            res.json(user)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            await service.delete(id)
            res.status(201).json({ id })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = UserController