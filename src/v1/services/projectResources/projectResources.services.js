const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ProjectResourcesService {
    async create(data) {
        const newResource = await models.ProjectResources.create(data, {include: 'project'})
        return newResource
    }

    async findAll() {
        const resources = await models.ProjectResources.findAll({include: 'project'})
        return resources
    }

    async findOne(id) {
        const resource = await models.ProjectResources.findByPk(id, { include: 'project' })
        return resource
    }
 
    async findByProjectName(projectName) {
        const resource = await models.ProjectResources.findAll({
            where: { projectName },
            include: 'project'
        })
        return resource
    }   

    async updateOne(id, changes) {
        const resource = await models.ProjectResources.findByPk(id)
        const updatedResource = resource.update(changes)
        return updatedResource
    }
    
    async deleteOne(id) {
        const resource = await models.ProjectResources.findByPk(id)
        resource.destroy()
        return { id }
    }
}

module.exports = ProjectResourcesService