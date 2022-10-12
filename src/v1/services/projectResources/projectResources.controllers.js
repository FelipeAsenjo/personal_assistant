const boom = require('@hapi/boom')
const ProjectResourcesService = require('./projectResources.services')

const service = new ProjectResourcesService()

class ProjectResourcesController {
    async create(req, res, next) {
        const { body, user } = req
        const { project_id } = req.params
        try {
            const newResource = await service.create(
                project_id, 
                user.id, 
                { ...body, project_id }
            )
            res.status(201).json(newResource)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        const { project_id } = req.params
        try {
            const resources = await service.findAll(req.user.id, project_id)
            res.status(200).json(resources)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const resource = await service.findOne(
                params.id,
                user.id, 
                params.project_id
            )
            if(!resource) throw boom.notFound('resource not found')

            res.status(200).json(resource)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { params, user } = req
        try {
            const resourceExist = await service.findOne(
                params.id, 
                user.id,
                params.project_id
            )
            if(!resourceExist) throw boom.notFound('resource not found')

            const resource = await service.updateOne(params.id, req.body)
            res.status(201).json(resource)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const resourceExist = await service.findOne(id, req.user.id)
            if(!resourceExist) throw boom.notFound('resource not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'resource deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = ProjectResourcesController