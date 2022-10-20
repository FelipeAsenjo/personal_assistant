const { sequelize } = require('../../../libs/sequelize/connection')
const { BankAccount } = require('../../../libs/sequelize/models/bankAccount.model')
const { models } = sequelize

const accountAttributes = ['bank', 'account_type', 'account_number']

class TransferService {
    async create(user_account_id, user_id, data) {
        const newTransfer = await models.Transfer.create(data, {
            where: { '$user_account.user_id$': user_id, user_account_id },
            include: 'user_account'
        })
        return newTransfer
    }

    async findAll(query, user_id, user_account_id) {
        const transfers = await models.Transfer.findAll({
            where: { 
                '$user_account.user_id$': user_id, 
                user_account_id, 
                ...query 
            },
            include: {
                model: BankAccount,
                as: 'user_account',
                attributes: accountAttributes
            }
        })
        return transfers
    }

    async findOne(id, user_id) {
        const transfer = await models.Transfer.findByPk(id, {
            where: { '$user_account.user_id$': user_id },
            include: {
                model: BankAccount,
                as: 'user_account',
                attributes: accountAttributes
            }
        })
        return transfer
    }

    async updateOne(id, changes) {
        const transfer = await models.Transfer.findByPk(id)
        const updatedTransfer = await transfer.update(changes)
        return updatedTransfer
    }
    
    async deleteOne(id) {
        const transfer = await models.Transfer.findByPk(id)
        await transfer.destroy()
        return id
    }
}

module.exports = TransferService