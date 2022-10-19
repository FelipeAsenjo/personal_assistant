const boom = require('@hapi/boom')
const PeopleService = require('./people.services')
const { searchByMulti } = require('../../../utils/finders.utils')
// person finders are commented, check before test

const service = new PeopleService()

class PeopleController {
    async create(req, res, next) {
        try {
            const newPerson = await service.create(req.body)
            res.status(201).json(newPerson)
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
            const person = await service.findOne(req.params.id)
            if(!person) throw boom.notFound('person not found')

            res.status(200).json(person)
        } catch(error) {
            next(error)
        }
    }

    async findPerson(req, res, next) {
        try {
            const person = await searchByMulti(req.body)
            if(!person) throw boom.notFound('person not found')

            res.status(200).json(person)
        } catch(error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const personExist = await service.findOne(id)
            if(!personExist) throw boom.notFound('person not found')

            const person = await service.updateOne(id, req.body)
            res.status(201).json(person)
        } catch(error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const personExist = await service.findOne(id)
            if(!personExist) throw boom.notFound('person not found')

            await service.deleteOne(id)
            res.status(200).json({ id, message: 'person deleted' })
        } catch(error) {
            next(error)
        }
    }
}

// const searchByMulti = async (body) => {
//     const { rut, last_name, name } = body
//     const personExist = async () => {
//         try {
//             if(rut) {
//                 const personByRut = await service.findByRut(rut)
//                 if(!personByRut) throw boom.notFound('person not found')
//                 return personByRut
//             } 
//             if(last_name) {
//                 const personByLastName = await service.findByLastName(last_name)
//                 if(!personByLastName) throw boom.notFound('person not found')
//                 return personByLastName
//             } 
//             if(name) {
//                 const personByName = await service.findByAlias(name)
//                 if(!personByName) throw boom.notFound('person not found')
//                 return personByName
//             } 

//             return false
//         } catch(error) {
//             next(error)
//         }
//     }

//     return personExist()
// }

module.exports = PeopleController