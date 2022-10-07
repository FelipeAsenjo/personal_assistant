const Joi = require('joi')
const { updatePersonSchema: person }  = require('../people/people.validations')
const { updateEmailSchema: email }  = require('../emails/emails.validations')

const id = Joi.string().guid()
const alias = Joi.string().max(50)
const blocked = Joi.bool()
const favorite = Joi.bool()

const createContactSchema = Joi.object({                                                       
  alias,
  favorite,
  blocked,
  person,
})

const updateContactSchema = Joi.object({                                                       
  alias,
  favorite,
  blocked,
  person,
})

const getContactSchema = Joi.object({
  id,
  person,
  email,
  alias,
})
 
module.exports = { createContactSchema, updateContactSchema, getContactSchema }  