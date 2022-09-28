const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class BankAccountService {
    async create(data) {
        const newBankAccount = await models.BankAccount.create(data)
        return newBankAccount
    }

    async findAll() {
        const bankAccounts = await models.BankAccount.findAll()
        return bankAccounts
    }

    async findOne(id) {
        const bankAccount = await models.BankAccount.findByPk(id, { include: 'person' })
        return bankAccount
    }
 
    async findByAccountNumber(accountNumber) {
        const bankAccount = await models.BankAccount.findOne({where: { accountNumber }, include: 'person'})
        return bankAccount
    }   

    async findByRut(rut) {
        const bankAccount = await models.BankAccount.findOne({
            where: { '$person.rut$' : rut },
            include: 'person'
        })
        return bankAccount
    }

    async updateOne(id, changes) {
        const bankAccount = await models.BankAccount.findByPk(id)
        const updatedAccount = bankAccount.update(changes)
        return updatedAccount
    }
    
    async deleteOne(id) {
        const bankAccount = await models.BankAccount.findByPk(id)
        bankAccount.destroy()
        return { id }
    }
}

module.exports = BankAccountService