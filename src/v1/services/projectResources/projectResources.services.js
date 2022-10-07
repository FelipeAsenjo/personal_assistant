const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ProjectResourcesService {
    async create(data) {
        const newResource = await models.ProjectResources.create(data, {
            include: 'project'
        })
        return newResource
    }

    async findAll(user_id) {
        const resources = await models.ProjectResources.findAll({
            where: { '$project.user_id$': user_id },
            include: 'project'
        })
        return resources
    }

    async findOne(id, user_id) {
        const resource = await models.ProjectResources.findByPk(id, {
            where: { '$project.user_id$': user_id },
            include: 'project'
        })
        return resource
    }
 
    async findByProjectName(title, user_id) {
        const resource = await models.ProjectResources.findAll({
            where: { '$project.user_id$': user_id, title },
            include: 'project'
        })
        return resource
    }   
 
    async findByProjectId(project_id, user_id) {
        const resource = await models.ProjectResources.findAll({
            where: { '$project.user_id$': user_id, project_id },
            include: 'project'
        })
        return resource
    }   

    async updateOne(id, changes) {
        const resource = await models.ProjectResources.findByPk(id)
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