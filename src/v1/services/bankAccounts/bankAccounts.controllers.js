const boom = require('@hapi/boom')
const BankAccountService = require('./bankAccounts.services')

const service = new BankAccountService()

class BankAccountController {
    async create(req, res, next) {
        const { body, user } = req
        try {
            const accountExist = await this.findByAccountNumber(body.account_number, user.id)
            if(accountExist) throw boom.conflict('account already exist')
            if(!body.contact_id) body.user_id = user.id

            const newAccount = await service.create(body)
            res.status(201).json(newAccount)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const account = await service.findAll(req.user.id)
            res.status(200).json(account)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const account = await service.findOne(params.id, user.id)
            if(!account) throw boom.notFound('account not found')

            res.status(200).json(account.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findMyOwn(req, res, next) {
        try {
            const account = await service.findMyOwn(req.user.id)
            if(!account) throw boom.notFound('account not found')

            res.status(200).json(account.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByAccountNumber(req, res, next) {
        const { body, user } = req
        try {
            const account = await service.findByAccountNumber(body.account_number, user.id)
            if(!account) throw boom.notFound('account not found')

            res.status(200).json(account.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByRut(req, res, next) {
        const { body, user } = req
        try {
            const account = await service.findByRut(body.rut, user.id)
            if(!account) throw boom.notFound('account not found')

            res.status(200).json(account.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByContact(req, res, next) {
        const { body, user } = req
        try {
            const account = await service.findByContact(body.contact_id, user.id)
            if(!account) throw boom.notFound('account not found')

            res.status(200).json(account.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { body, params, user } = req
        try {
            const accountExist = await service.findOne(params.id, user.id)
            if(!accountExist) throw boom.notFound('account not found')

            const account = await service.updateOne(id, body)
            res.status(201).json(account.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const accountExist = id ?
                await service.findOne(id, req.user.id) :
                await this.findContact(req.body)
            if(!accountExist) throw boom.notFound('account not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'account deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = BankAccountController