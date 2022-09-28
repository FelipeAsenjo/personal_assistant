const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class InventoryService {
    async create(data) {
        const newItem = await models.Inventory.create(data)
        return newItem
    }

    async findAll(user_id) {
        const Inventory = await models.Inventory.findAll({where: { user_id }})
        return Inventory
    }

    async findOne(id) {
        const Item = await models.Inventory.findByPk(id)
        return Item
    }
 
    async findItemByName(itemName) {
        const Item = await models.Inventory.findAll({where: { itemName }})
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