const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class WishlistService {
    async create(data) {
        const newWish = await models.Wishlist.create(data)
        return newWish
    }

    async findAll(Wish_id) {
        const wishes = await models.Wishlist.findAll({where: { user_id }})
        return wishes
    }

    async findOne(id) {
        const wish = await models.Wishlist.findByPk(id)
        return wish
    }
 
    async findByItemName(itemName) {
        const wish = await models.Wishlist.findOne({where: { itemName }})
        return wish
    }

    async updateOne(id, changes) {
        const wish = await models.Wishlist.findByPk(id)
        const updatedWish = wish.update(changes)
        return updatedWish
    }
    
    async deleteOne(id) {
        const wish = await models.Wishlist.findByPk(id)
        wish.destroy()
        return { id }
    }
}

module.exports = WishlistService