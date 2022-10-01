const boom = require('@hapi/boom')
const TransferService = require('./transfers.services')

const service = new TransferService()

class TransferController {
    async create(req, res, next) {
        const { body } = req
        try {
            const newTransfer = await service.create(body)
            res.status(201).json(newTransfer.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const transfers = await service.findAll(req.user.id)
            res.status(200).json(transfers)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        const { params, user } = req
        try {
            const transfer = await service.findOne(params.id, user.id)
            if(!transfer) throw boom.notFound('transfer not found')

            res.status(200).json(transfer.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByAccountNumber(req, res, next) {
        const { body, user } = req
        try {
            const transfer = await service.findByAccountNumber(body.account_number, user.id)
            if(!transfer) throw boom.notFound('transfer not found')

            res.status(200).json(transfer.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByContact(req, res, next) {
        const { body, user } = req
        try {
            const transfer = await service.findByContact(body.contact_id, user.id)
            if(!transfer) throw boom.notFound('transfer not found')

            res.status(200).json(transfer.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByStandBy(req, res, next) {
        const { body, user } = req
        try {
            const transfer = await service.findByStandBy(body.standby, user.id)
            if(!transfer) throw boom.notFound('transfer not found')

            res.status(200).json(transfer.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findByIncome(req, res, next) {
        const { body, user } = req
        try {
            const transfer = await service.findByIncome(body.is_income, user.id)
            if(!transfer) throw boom.notFound('transfer not found')

            res.status(200).json(transfer.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const transferExist = await service.findOne(id, req.user.id)
            if(!transferExist) throw boom.notFound('transfer not found')

            const transfer = await service.updateOne(id, req.body)
            res.status(201).json(transfer.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const transferExist = await service.findOne(id, req.user.id)
            if(!transferExist) throw boom.notFound('transfer not found')

            await service.deleteOne(id)
            res.status(204).json({ id, message: 'transfer deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = TransferController