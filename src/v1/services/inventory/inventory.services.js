const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class InventoryService {
    async create(data) {
        const newItem = await models.Inventory.create(data)
        return newItem
    }

    async findAll(user_id) {
        const inventory = await models.Inventory.findAll({
            where: { user_id }
        })
        return inventory
    }

    async findOne(id, user_id) {
        const item = await models.Inventory.findByPk(id, {
            where: { user_id }
        })
        return item
    }
 
    async findItemByName(item_name, user_id) {
        const item = await models.Inventory.findAll({
            where: { 
                item_name: { [Op.like]: `%${item_name}%` }, 
                user_id 
            }
        })
        return item
    }   

    async updateOne(id, changes) {
        const item = await models.Inventory.findByPk(id)
        const updatedItem = await item.update(changes)
        return updatedItem
    }
    
    async deleteOne(id) {
        const item = await models.Inventory.findByPk(id)
        await item.destroy()
        return id
    }
}

module.exports = InventoryService