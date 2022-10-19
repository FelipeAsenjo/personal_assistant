const Joi = require('joi')
// const { updateContactSchema: contact } = require('../contacts/contacts.validations')

const id = Joi.string().guid()
const street = Joi.string()
const number = Joi.number()
const apartment = Joi.string().max(20)
const suburb = Joi.string().max(100)
const city = Joi.string().max(100)
const state = Joi.string().max(100)
const country = Joi.string().max(100)
const tag = Joi.string().max(25)

const createAddressSchema = Joi.object({                                                       
  street: street.required(),
  number: number.required(),
  apartment,
  suburb,
  city,
  state,
  country,
  tag,
})

const updateAddressSchema = Joi.object({                                                       
  street,
  number,
  apartment,
  suburb,
  city,
  state,
  country,
  tag,
})

const getAddressSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createAddressSchema, updateAddressSchema, getAddressSchema }  