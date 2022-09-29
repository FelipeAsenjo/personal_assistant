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

    async findOne(id) {
        const task = await models.Task.findByPk(id, {
            where: { user_id }
        })
        return task
    }
 
    async findByTitle(title, user_id) {
        const Item = await models.Task.findAll({
            where: { title, user_id }
        })
        return Item
    }   

    async findByActive(done, user_id) {
        const Item = await models.Task.findAll({
            where: { 
                [Op.and]: {
                    [Op.is]: { done }, 
                    user_id
                }
            }
        })
        return Item
    }   
    
    async updateOne(id, changes) {
        const task = await models.Task.findByPk(id)
        const updatedTask = task.update(changes)
        return updatedTask
    }
    
    async deleteOne(id) {
        const task = await models.Task.findByPk(id)
        task.destroy()
        return { id }
    }
}

module.exports = TaskService