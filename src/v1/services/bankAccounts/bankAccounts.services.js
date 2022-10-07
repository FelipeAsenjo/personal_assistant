const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { Person } = require('../../../libs/sequelize/models/people.model')
const { User } = require('../../../libs/sequelize/models/users.model')
const { models } = sequelize

class BankAccountService {
    async create(data) {
        const newBankAccount = await models.BankAccount.create(data, {
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return newBankAccount
    }

    async findAll(user_id) {
        const bankAccounts = await models.BankAccount.findAll({
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return bankAccounts
    }

    async findOne(id, user_id) {
        const bankAccount = await models.BankAccount.findByPk(id, {
            where: { user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return bankAccount
    }

    async findMyOwn(user_id) {
        const bankAccount = await models.BankAccount.findAll({
            where: { user_id },
            include: {
                model: User,
                as: 'user',
                include: 'person'
            }
        })
        return bankAccount
    }

    async findByAccountNumber(account_number, user_id) {
        const bankAccount = await models.BankAccount.findOne({
            where: { '$contact.user_id$': user_id, account_number },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return bankAccount
    }   

    async findByRut(rut, user_id) {
        const bankAccount = await models.BankAccount.findAll({
            where: { '$contact.user_id$': user_id },
            include: {
                model: Contact,
                as: 'contact',
                include: {
                    model: Person,
                    as: 'person',
                    where: { rut }
                }
            }
        })
        return bankAccount
    }

    async findByContact(contact_id, user_id) {
        const phone = await models.Phone.findAll({
            where: { '$contact.user_id$': user_id, contact_id },
            include: {
                model: Contact,
                as: 'contact',
                include: 'person'
            }
        })
        return phone
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