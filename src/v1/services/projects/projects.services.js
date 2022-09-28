const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ProjectService {
    async create(data) {
        const newProject = await models.Project.create(data)
        return newProject
    }

    async findAll(user_id) {
        const projects = await models.Project.findAll({where: { user_id }})
        return projects
    }

    async findOne(id) {
        const project = await models.Project.findByPk(id)
        return project
    }

    async findByUsername(username) {
        const projects = await models.Project.findAll({where: { username }, include: 'owner'})
        return projects
    }

    async updateOne(id, changes) {
        const project = await models.Project.findByPk(id)
        const updatedProject = project.update(changes)
        return updatedProject
    }
    
    async deleteOne(id) {
        const project = await models.Project.findByPk(id)
        project.destroy()
        return { id }
    }
}

module.exports = ProjectService