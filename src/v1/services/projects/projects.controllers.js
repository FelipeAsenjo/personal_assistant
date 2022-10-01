const boom = require('@hapi/boom')
const ProjectService = require('./projects.services')

const service = new ProjectService()

class ProjectController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const projectExist = await service.findByProjectName(body.project_name, user.id)
            if(projectExist) throw boom.conflict('project already exist')

            const newproject = await service.create({ ...body, user_id: user.id })
            res.status(201).json(newproject.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const projects = await service.findAll(req.user.id)
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

            res.status(200).json(project.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByProjectName(req, res, next) {
        const { body, user } = req
        try {
            const project = await service.findByProjectName(body.project_name, user.id)
            if(!project) throw boom.notFound('project not found')

            res.status(200).json(project.dataValues)
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
            res.status(201).json(project.dataValues)
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
            res.status(204).json({ id, message: 'project deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = ProjectController