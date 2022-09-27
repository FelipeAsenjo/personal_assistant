const Joi = require('joi')

const id = Joi.string().guid()
const service = Joi.string().max(30)
const account_name = Joi.string().max(50)
const link = Joi.string()
const tag = Joi.string().max(25)

const createSocialMediaSchema = Joi.object({                                                       
  service: service.required(),
  account_name: account_name.required(),
  link,
  tag,
})

const updateSocialMediaSchema = Joi.object({                                                       
  service,
  account_name,
  link,
  tag,
})

const getSocialMediaSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createSocialMediaSchema, updateSocialMediaSchema, getSocialMediaSchema }  