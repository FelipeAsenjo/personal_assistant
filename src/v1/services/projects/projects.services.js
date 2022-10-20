const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ProjectService {
    async create(data) {
        const newProject = await models.Project.create(data, {
            include: 'owner'
        })
        return newProject
    }

    async findAll(query, user_id) {
        const projects = await models.Project.findAll({
            where: { ...query, user_id },
            include: ['tasks', 'resources']
        })
        return projects
    }

    async findOne(id, user_id) {
        const project = await models.Project.findByPk(id, {
            where: { user_id },
            include: ['tasks', 'resources']
        })
        return project
    }

    async updateOne(id, changes) {
        const project = await models.Project.findByPk(id)
        const updatedProject = await project.update(changes)
        return updatedProject
    }
    
    async deleteOne(id) {
        const project = await models.Project.findByPk(id)
        await project.destroy()
        return id
    }
}

module.exports = ProjectService