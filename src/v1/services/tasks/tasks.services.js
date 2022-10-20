const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class TaskService {
    async create(data) {
        const newTask = await models.Task.create(data)
        return newTask
    }

    async findAll(query, user_id) {
        const tasks = await models.Task.findAll({
            where: { ...query, user_id }
        })
        return tasks
    }

    async findOne(id, user_id) {
        const task = await models.Task.findByPk(id, {
            where: { user_id }
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