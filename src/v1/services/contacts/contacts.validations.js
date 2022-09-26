const Joi = require('joi')

const id = Joi.string().guid()
const name = Joi.string().max(50)
const last_name = Joi.string().max(50)
const alias = Joi.string().max(50)
const birthday = Joi.date()
const rut = Joi.string().min(9).max(10)
const email = Joi.string().email().max(50)
const blocked = Joi.bool()
const favorite = Joi.bool()
const person = Joi.object({
  name,
  last_name,
  birthday,
  rut
})

const createContactSchema = Joi.object({                                                       
  person,
  alias,
  favorite,
  blocked
})

const updateContactSchema = Joi.object({                                                       
  person,
  alias,
  favorite,
  blocked
})

const getContactSchema = Joi.object({
  id,
  rut,
  email,
  alias,
})
 
module.exports = { createContactSchema, updateContactSchema, getContactSchema }  