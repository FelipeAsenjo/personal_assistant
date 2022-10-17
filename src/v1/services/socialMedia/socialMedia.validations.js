const Joi = require('joi')

const id = Joi.string().guid()
const service = Joi.string().max(30)
const username = Joi.string().max(50)
const link = Joi.string()
const tag = Joi.string().max(25)

const createSocialMediaSchema = Joi.object({                                                       
  service: service.required(),
  username: username.required(),
  link,
  tag,
})

const updateSocialMediaSchema = Joi.object({                                                       
  service,
  username,
  link,
  tag,
})

const getSocialMediaSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createSocialMediaSchema, updateSocialMediaSchema, getSocialMediaSchema }  