const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { models } = sequelize

class TransferService {
    async create(data) {
        const newTransfer = await models.Transfer.create(data, {include: 'person'})
        return newTransfer
    }

    async findAll(user_id) {
        const transfers = await models.Transfer.findAll({
            where: { '$from_account.user_id$': user_id },
        })
        return transfers
    }

    async findOne(id, user_id) {
        const transfer = await models.Transfer.findByPk(id, {
            where: { '$from_account.user_id$': user_id },
        })
        return transfer
    }
 
    async findByAccountNumber(account_number, user_id) {
        const transfer = await models.Transfer.findAll({
            where: { '$from_account.user_id$': user_id, account_number },
        })
        return transfer
    }

    async findByContact(contact_id, user_id) {
        const transfer = await models.Transfer.findAll({
            where: { contact_id, user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return transfer
    }

    async findByStandBy(standby, user_id) {
        const transfer = await models.Transfer.findAll({
            where: { '$from_account.user_id$': user_id, standby },
        })
        return transfer
    }

    async findByIncome(is_income, user_id) {
        const transfer = await models.Transfer.findAll({
            where: { '$from_account.user_id$': user_id, is_income },
        })
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