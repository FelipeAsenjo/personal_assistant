const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class TaskService {
    async create(data) {
        const newTask = await models.Task.create(data)
        return newTask
    }

    async findAll(user_id) {
        const tasks = await models.Task.findAll({
            where: { user_id }
        })
        return tasks
    }

    async findOne(id, user_id) {
        const task = await models.Task.findByPk(id, {
            where: { user_id }
        })
        return task
    }
 
    async findByTitle(title, user_id) {
        const task = await models.Task.findAll({
            where: { 
               title: { [Op.like]: `%${title}%`}, 
               user_id 
            }
        })
        return task
    }   

    async findByActive(user_id) {
        const task = await models.Task.findAll({
            where: { user_id, done: false }
        })
        return task
    }   
    
    async updateOne(id, changes) {
        const task = await models.Task.findByPk(id)
        const updatedTask = await task.update(changes)
        return updatedTask
    }
    
    async deleteOne(id) {
        const task = await models.Task.findByPk(id)
        await task.destroy()
        return id
    }
}

module.exports = TaskService