const Joi = require('joi')

const id = Joi.string().guid()
const name = Joi.string()
const last_name = Joi.string()
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.number().min(0).max(5)

const createUserSchema = Joi.object({                                                       
  name: name,
  last_name: last_name,
  email: email.required(),
  password: password.required(),
  role: role
})

const updateUserSchema = Joi.object({                                                       
  name: name,
  last_name: last_name,
  email: email,
  password: password,
  role: role,
})

const getUserSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createUserSchema, updateUserSchema, getUserSchema }  