const Joi = require('joi')

const id = Joi.string().guid()
const title = Joi.string().max(100)
const description = Joi.string()
const link = Joi.string()

const createProjectResourcesSchema = Joi.object({                                                       
  title,
  description,
  link,
})

const updateProjectResourcesSchema = Joi.object({                                                       
  title,
  description,
  link,
})

const getProjectResourcesSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createProjectResourcesSchema, updateProjectResourcesSchema, getProjectResourcesSchema }  