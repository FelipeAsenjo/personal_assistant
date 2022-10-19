const Joi = require('joi')

const id = Joi.string().guid()
const title = Joi.string().max(100)
const description = Joi.string()
const conclusions = Joi.string()

const createProjectSchema = Joi.object({                                                       
  title: title.required(),
  description,
  conclusions,
})

const updateProjectSchema = Joi.object({                                                       
  title,
  description,
  conclusions,
})

const getProjectSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createProjectSchema, updateProjectSchema, getProjectSchema }  