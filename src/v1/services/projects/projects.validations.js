const Joi = require('joi')

const id = Joi.string().guid()
const title = Joi.string().max(100)
const description = Joi.string()
const thoughts = Joi.string()

const createProjectSchema = Joi.object({                                                       
  title: title.required(),
  description,
  thoughts,
})

const updateProjectSchema = Joi.object({                                                       
  title,
  description,
  thoughts,
})

const getProjectSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createProjectSchema, updateProjectSchema, getProjectSchema }  