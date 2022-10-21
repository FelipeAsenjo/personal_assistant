const boom = require('@hapi/boom')
const ProjectService = require('./projects.services')

const service = new ProjectService()

class ProjectController {
    async create(req, res, next) {
        const { body, user, fromProject, params } = req

        try {
            const newproject = await service.create(data)
            res.status(201).json(newproject)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        const { query, user } = req
        try {
            const projects = await service.findAll(query, user.id)
            res.status(200).json(projects)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const project = await service.findOne(params.id, user.id)
            if(!project) throw boom.notFound('project not found')

            res.status(200).json(project)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const projectExist = await service.findOne(id, req.user.id)
            if(!projectExist) throw boom.notFound('project not found')

            const project = await service.updateOne(id, req.body)
            res.status(201).json(project)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const projectExist = await service.findOne(id, req.user.id)
            if(!projectExist) throw boom.notFound('project not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'project deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = ProjectController