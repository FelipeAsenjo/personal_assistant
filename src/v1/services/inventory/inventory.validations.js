const Joi = require('joi')

const id = Joi.string().guid()
const item_name = Joi.string().max(100)
const description = Joi.string()
const docs = Joi.string()
const is_software = Joi.bool()
const is_for_sale = Joi.bool()

const createInventorySchema = Joi.object({                                                       
  item_name: item_name.required(),
  description,
  docs,
  is_software,
  is_for_sale,
})

const updateInventorySchema = Joi.object({                                                       
  item_name,
  description,
  docs,
  is_software,
  is_for_sale,
})

const getInventorySchema = Joi.object({
  id: id.required()
})
 
module.exports = { createInventorySchema, updateInventorySchema, getInventorySchema }  