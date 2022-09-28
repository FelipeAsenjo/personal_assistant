const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class TransferService {
    async create(data) {
        const newTransfer = await models.Transfer.create(data, {include: 'person'})
        return newTransfer
    }

    async findAll() {
        const transfers = await models.Transfer.findAll({include: 'person'})
        return transfers
    }

    async findOne(id) {
        const transfer = await models.Transfer.findByPk(id, { include: 'person' })
        return transfer
    }
 
    async findByAccountNumber(account_number) {
        const transfer = await models.Transfer.findOne({where: { account_number }})
        return transfer
    }

    async updateOne(id, changes) {
        const transfer = await models.Transfer.findByPk(id)
        const updatedTransfer = transfer.update(changes)
        return updatedTransfer
    }
    
    async deleteOne(id) {
        const transfer = await models.Transfer.findByPk(id)
        transfer.destroy()
        return { id }
    }
}

module.exports = TransferService