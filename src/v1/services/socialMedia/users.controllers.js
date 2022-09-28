const boom = require('@hapi/boom')
const UserService = require('./users.services')
const { encryptPass } = require('../../../utils/auth.utils')

const service = new UserService()

class UserController {
    async create(req, res, next) {
        const { body } = req
        try {
            const userExist = await service.findByUsername(body.username)
            if(userExist) throw boom.conflict('user already exist')

            body.password = encryptPass(body.password)
            const newUser = await service.create(body)
            const {password, ...userWithoutPassword} = newUser.dataValues

            res.status(201).json(userWithoutPassword)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const users = await service.findAll()
            res.status(200).json(users)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        try {
            const { id } = req.params
            const user = await service.findOne(id)
            if(!user) throw boom.notFound('user not found')

            const {password, ...userWithoutPassword} = user.dataValues
            res.status(200).json(userWithoutPassword)
        } catch(error) {
            next(error)
        }
    }

    async findByRut(req, res, next) {
        try {
            const { rut } = req.body
            const user = await service.findByRut(rut)
            if(!user) throw boom.notFound('user not found')

            const {password, ...userWithoutPassword} = user.dataValues
            res.status(200).json(userWithoutPassword)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const userExist = await service.findOne(id)
            if(!userExist) throw boom.notFound('user not found')

            const user = await service.updateOne(id, req.body)
            const {password, ...userWithoutPassword} = user.dataValues
            res.status(201).json(userWithoutPassword)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const userExist = await service.findOne(id)
            if(!userExist) throw boom.notFound('user not found')

            await service.deleteOne(id)
            res.status(204).json({ id, message: 'user deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = UserController