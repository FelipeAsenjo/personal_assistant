const Joi = require('joi')

const id = Joi.string().guid()
const item_name = Joi.string().max(100)
const description = Joi.string()
const brand = Joi.string().max(30)
const model = Joi.string().max(30)
const specs = Joi.string()
const done = Joi.bool()
const favorite = Joi.bool()

const createWishlistSchema = Joi.object({                                                       
  item_name: item_name.required(),
  description,
  brand,
  model,
  specs,
  done,
  favorite,
})

const updateWishlistSchema = Joi.object({                                                       
  item_name,
  description,
  brand,
  model,
  specs,
  done,
  favorite,
})

const getWishlistSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createWishlistSchema, updateWishlistSchema, getWishlistSchema }  