const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { ProjectResources } = require('../../../libs/sequelize/models/projectResources.model')
const { Task } = require('../../../libs/sequelize/models/tasks.model')
const { models } = sequelize

const taskAttributes = ['id', 'title', 'description', 'done']
const resourcesAttributes = ['id', 'title', 'description', 'link']

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
            include: [
                {
                    model: Task,
                    as: 'tasks',
                    attributes: taskAttributes
                }, {
                    model: ProjectResources,
                    as: 'resources',
                    attributes: resourcesAttributes
                }
            ]
        })
        return projects
    }

    async findOne(id, user_id) {
        const project = await models.Project.findByPk(id, {
            where: { user_id },
            include: [
                {
                    model: Task,
                    as: 'tasks',
                    attributes: taskAttributes
                }, {
                    model: ProjectResources,
                    as: 'resources',
                    attributes: resourcesAttributes
                }
            ]
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