const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class PeopleService {
    async create(data) {
        const newPerson = await models.Person.create(data)
        return newPerson
    }

    async findAll() {
        const people = await models.Person.findAll()
        return people
    }

    async findOne(id) {
        const person = await models.Person.findByPk(id)
        return person
    }
 
    async findByRut(rut) {
        const person = await models.Person.findOne({where: { rut }})
        return person
    }   

    async updateOne(id, changes) {
        const person = await models.Person.findByPk(id)
        const updatedPerson = person.update(changes)
        return updatedPerson
    }
    
    async deleteOne(id) {
        const person = await models.Person.findByPk(id)
        person.destroy()
        return { id }
    }
}

module.exports = PeopleService