const boom = require('@hapi/boom')
const PeopleService = require('./people.services')

const service = new PeopleService()

class PeopleController {
    async create(req, res, next) {
        const { body } = req
        try {
            const personExist = await service.findByRut(body.rut)
            if(personExist) throw boom.conflict('person already exist')

            const newPerson = await service.create(body)

            res.status(201).json(newPerson.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const people = await service.findAll()
            res.status(200).json(people)
        } catch(error) {
            next(error)
        }
    }

    async findOne(req, res, next) {
        try {
            const { id } = req.params
            const person = await service.findOne(id)
            if(!person) throw boom.notFound('person not found')

            res.status(200).json(person.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params
            const personExist = await service.findOne(id)
            if(!personExist) throw boom.notFound('person not found')

            const person = await service.updateOne(id, req.body)
            res.status(201).json(person.dataValues)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const personExist = await service.findOne(id)
            if(!personExist) throw boom.notFound('person not found')

            await service.deleteOne(id)
            res.status(204).json({ id, message: 'person deleted' })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = PeopleController