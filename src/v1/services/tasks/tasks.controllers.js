const boom = require('@hapi/boom')
const TaskService = require('./tasks.services')

const service = new TaskService()

class TaskController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const newTask = await service.create({ ...body, user_id: user.id })
            res.status(201).json(newTask.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const tasks = await service.findAll(req.user.id)
            res.status(200).json(tasks)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const task = await service.findOne(params.id, user.id)
            if(!task) throw boom.notFound('task not found')

            res.status(200).json(task)
        } catch(error) {
            next(error)
        }
    }

    async findByTitle(req, res, next) {
        const { body, user } = req
        try {
            const task = await service.findByTitle(body.title, user.id)
            if(!task) throw boom.notFound('task not found')

            res.status(200).json(task)
        } catch(error) {
            next(error)
        }
    }

    async findByActive(req, res, next) {
        try {
            const task = await service.findByActive(req.user.id)
            if(!task) throw boom.notFound('task not found')

            res.status(200).json(task)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const taskExist = await service.findOne(id, req.user.id)
            if(!taskExist) throw boom.notFound('task not found')

            const task = await service.updateOne(id, req.body)
            res.status(201).json(task)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const task = await service.findOne(id, req.user.id)
            if(!task) throw boom.notFound('task not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'task deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = TaskController