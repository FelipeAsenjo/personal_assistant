const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class ProjectService {
    async create(data) {
        const newProject = await models.Project.create(data)
        return newProject
    }

    async findAll(user_id) {
        const projects = await models.Project.findAll({
            where: { user_id },
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
 
    async findItemByName(title, user_id) {
        const Item = await models.Project.findAll({
            where: { title, user_id }
        })
        return Item
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