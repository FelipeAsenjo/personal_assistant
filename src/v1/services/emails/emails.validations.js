const Joi = require('joi')

const id = Joi.string().guid()
const address = Joi.string().email().max(200)
const tag = Joi.string().max(25)

const createEmailSchema = Joi.object({                                                       
  address: address.required(),
  tag,
})

const updateEmailSchema = Joi.object({                                                       
  address,
  tag,
})

const getEmailSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createEmailSchema, updateEmailSchema, getEmailSchema }  