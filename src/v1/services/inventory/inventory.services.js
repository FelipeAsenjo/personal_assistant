const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class InventoryService {
    async create(data) {
        const newItem = await models.Inventory.create(data)
        return newItem
    }

    async findAll(user_id) {
        const Inventory = await models.Inventory.findAll({
            where: { user_id }
        })
        return Inventory
    }

    async findOne(id, user_id) {
        const Item = await models.Inventory.findByPk(id, {
            where: { user_id }
        })
        return Item
    }
 
    async findItemByName(item_name, user_id) {
        const Item = await models.Inventory.findAll({
            where: { item_name, user_id }
        })
        return Item
    }   

    async updateOne(id, changes) {
        const Item = await models.Inventory.findByPk(id)
        const updatedItem = Item.update(changes)
        return updatedItem
    }
    
    async deleteOne(id) {
        const Item = await models.Inventory.findByPk(id)
        Item.destroy()
        return { id }
    }
}

module.exports = InventoryService