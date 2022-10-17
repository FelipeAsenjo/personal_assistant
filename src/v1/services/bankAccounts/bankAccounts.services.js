const { Op } = require('sequelize')
const { sequelize } = require('../../../libs/sequelize/connection')
const { Contact } = require('../../../libs/sequelize/models/contacts.model')
const { Person } = require('../../../libs/sequelize/models/people.model')
const { User } = require('../../../libs/sequelize/models/users.model')
const { models } = sequelize

const userAttributes = ['id', 'username']
const contactAttributes = ['alias']
const personAttributes = ['id', 'name', 'last_name', 'rut']

const includePerson = {
    model: Person,
    as: 'person',
    attributes: personAttributes
}

const includeContact = (person) => ({
    model: Contact,
    as: 'contact',
    attributes: contactAttributes,
    include: person
})

const includeUser = (person) => ({
    model: User,
    as: 'user',
    attributes: userAttributes,
    include: person
})


class BankAccountService {
    async create(data) {
        const newBankAccount = await models.BankAccount.create(data)
        return newBankAccount
    }

    async findAll(user_id) {
        const bankAccounts = await models.BankAccount.findAll({
            where: { '$contact.user_id$': user_id },
            include: includeContact(includePerson)
        })
        return bankAccounts
    }

    async findOne(id, user_id) {
        const bankAccount = await models.BankAccount.findByPk(id, {
            where: { user_id },
            include: includeContact(includePerson)
        })
        return bankAccount
    }

    async findMyOwn(user_id) {
        const bankAccount = await models.BankAccount.findAll({
            where: { user_id },
            include: includeUser(includePerson)
        })
        return bankAccount
    }

    async findByAccountNumber(account_number, user_id) {
        console.log(account_number)
        const bankAccount = await models.BankAccount.findOne({
            where: { 
                '$contact.user_id$': user_id,
                account_number 
            },
            include: includeContact(includePerson)
        })
        return bankAccount
    }   

    // async findByRut(rut, user_id) {
    //     const bankAccount = await models.BankAccount.findAll({
    //         where: { '$contact.user_id$': user_id },
    //         include: {
    //             model: Contact,
    //             as: 'contact',
    //             attributes: contactAttributes,
    //             include: {
    //                 model: Person,
    //                 as: 'person',
    //                 attributes: personAttributes,
    //                 where: { rut }
    //             }
    //         }
    //     })
    //     return bankAccount
    // }

    async findByContact(contact_id, user_id) {
        const bankAccount = await models.BankAccount.findAll({
            where: { '$contact.user_id$': user_id, contact_id },
            include: includeContact(includePerson)
        })
        return bankAccount
    }

    async updateOne(id, changes) {
        const bankAccount = await models.BankAccount.findByPk(id)
        const updatedAccount = await bankAccount.update(changes)
        return updatedAccount
    }
    
    async deleteOne(id) {
        const bankAccount = await models.BankAccount.findByPk(id)
        await bankAccount.destroy()
        return id
    }
}

module.exports = BankAccountService