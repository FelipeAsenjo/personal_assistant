const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { Project } = require('../../../libs/sequelize/models/projects.model')
const { models } = sequelize

class ProjectResourcesService {
    async create(project_id, user_id, data) {
        const newResource = await models.ProjectResources.create(data, {
            where: { '$project.user_id$': user_id, project_id }
        })
        return newResource
    }

    async findAll(user_id, project_id) {
        const resources = await models.ProjectResources.findAll({
            where: { '$project.user_id$': user_id, project_id },
            include: {
                model: Project,
                as: 'project',
                attributes: ['id', 'title']
            }
        })
        return resources
    }

    async findOne(id, user_id, project_id) {
        const resource = await models.ProjectResources.findByPk(id, {
            where: { '$project.user_id$': user_id, project_id },
            include: 'project'
        })
        return resource
    }

    async updateOne(id, changes) {
        const resource = await models.ProjectResources.findByPk(id, {
            include: 'project'
        })
        const updatedResource = await resource.update(changes)
        return updatedResource
    }
    
    async deleteOne(id) {
        const resource = await models.ProjectResources.findByPk(id)
        await resource.destroy()
        return id
    }
}

module.exports = ProjectResourcesService