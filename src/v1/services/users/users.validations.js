const Joi = require('joi')
const { updatePersonSchema: person }  = require('../people/people.validations')

const id = Joi.string().guid()
const username = Joi.string().email().max(50)
const password = Joi.string().min(8)
const role = Joi.number().min(0).max(5)

const createUserSchema = Joi.object({                                                       
  username: username.required(),
  password: password.required(),
  role,
  person,
})

const updateUserSchema = Joi.object({                                                       
  username,
  password,
  role,
  person,
})

const getUserSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createUserSchema, updateUserSchema, getUserSchema }  