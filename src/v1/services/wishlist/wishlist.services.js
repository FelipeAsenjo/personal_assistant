const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class WishlistService {
    async create(data) {
        const newWish = await models.Wishlist.create(data)
        return newWish
    }

    async findAll(query, user_id) {
        const wishes = await models.Wishlist.findAll({
            where: { ...query, user_id }
        })
        return wishes
    }

    async findOne(id, user_id) {
        const wish = await models.Wishlist.findByPk(id, {
            where: { user_id }
        })
        return wish
    }
 
    async updateOne(id, changes) {
        const wish = await models.Wishlist.findByPk(id)
        const updatedWish = await wish.update(changes)
        return updatedWish
    }
    
    async deleteOne(id) {
        const wish = await models.Wishlist.findByPk(id)
        await wish.destroy()
        return id
    }
}

module.exports = WishlistService