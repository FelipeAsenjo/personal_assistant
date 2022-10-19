const { sequelize } = require('../../../libs/sequelize/connection')
const { models } = sequelize

class PeopleService {
    async create(data) {
        const newPerson = await models.Person.create(data, {
            include: ['user', 'contact']
        })
        return newPerson
    }

    async findAll() {
        const people = await models.Person.findAll({
            include: ['user', 'contact']
        })
        return people
    }

    async findOne(id) {
        const person = await models.Person.findByPk(id, {
            include: ['user', 'contact']
        })
        return person
    }
 
    async findByRut(rut) {
        const person = await models.Person.findOne({
            where: { rut },
            include: ['user', 'contact']
        })
        return person
    }   
 
    async findByName(name) {
        const person = await models.Person.findAll({
            where: { name },
            include: ['user', 'contact']
        })
        return person
    }   

    async findByLastName(last_name) {
        const person = await models.Person.findAll({
            where: { last_name },
            include: ['user', 'contact']
        })
        return person
    }   

    async updateOne(id, changes) {
        const person = await models.Person.findByPk(id)
        const updatedPerson = await person.update(changes)
        return updatedPerson
    }
    
    async deleteOne(id) {
        const person = await models.Person.findByPk(id)
        await person.destroy()
        return id
    }
}

module.exports = PeopleService