const Joi = require('joi')

const id = Joi.string().guid()
const username = Joi.string().email().max(50)
const password = Joi.string().min(8)
const role = Joi.number().min(0).max(5)
const name = Joi.string().max(50)
const last_name = Joi.string().max(50)
const birthday = Joi.date()
const rut = Joi.string().min(9).max(10)
const person = Joi.object({
  name,
  last_name,
  birthday,
  rut
})

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