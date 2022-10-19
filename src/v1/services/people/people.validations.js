const Joi = require('joi')

const id = Joi.string().guid()
const name = Joi.string()
const last_name = Joi.string()
const alias = Joi.string().max(50)
const birthday = Joi.date()
const rut = Joi.string().min(9).max(10)

const createPersonSchema = Joi.object({                                                       
  name: name.required(),
  last_name,
  alias,
  birthday,
  rut,
})

const updatePersonSchema = Joi.object({                                                       
  name,
  last_name,
  alias,
  birthday,
  rut,
})

const getPersonSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createPersonSchema, updatePersonSchema, getPersonSchema }  