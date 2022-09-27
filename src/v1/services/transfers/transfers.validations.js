const Joi = require('joi')

const id = Joi.string().guid()
const is_income = Joi.bool()
const amount = Joi.number()
const currency = Joi.string().max(10)
const description = Joi.string()
const standby = Joi.bool()
const period_type = Joi.array().valid('YEAR', 'MONTH', 'WEEK', 'DAY', 'CUSTOM')
const period_iterator = Joi.number()
const schedules_at = Joi.date()

const createTransferSchema = Joi.object({                                                       
  amount: amount.required(),
  is_income,
  currency,
  description,
  standby,
  period_type,
  period_iterator,
  schedules_at,
})

const updateTransferSchema = Joi.object({                                                       
  amount,
  is_income,
  currency,
  description,
  standby,
  period_type,
  period_iterator,
  schedules_at,
})

const getTransferSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createTransferSchema, updateTransferSchema, getTransferSchema }  