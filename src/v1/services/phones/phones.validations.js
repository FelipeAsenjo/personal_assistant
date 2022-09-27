const Joi = require('joi')

const id = Joi.string().guid()
const country_code = Joi.string().max(10)
const number = Joi.number()
const tag = Joi.string().max(25)

const createPhonesSchema = Joi.object({                                                       
  number: number.required(),
  country_code,
  tag,
})

const updatePhonesSchema = Joi.object({                                                       
  number,
  country_code,
  tag,
})

const getPhonesSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createPhonesSchema, updatePhonesSchema, getPhonesSchema }  