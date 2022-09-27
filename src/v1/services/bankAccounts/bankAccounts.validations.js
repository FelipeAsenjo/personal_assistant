const Joi = require('joi')

const id = Joi.string().guid()
const bank = Joi.string().max(50)
const account_type = Joi.valid('CORRIENTE', 'VISTA', 'AHORRO', 'OTHER')
const account_number = Joi.number().positive()
const cash_balance = Joi.number()
const line_of_credit_balance = Joi.number()
const credit_balance = Joi.number()
const currency = Joi.string().max(10)
const tag = Joi.string().max(25)

const createBankAccountSchema = Joi.object({                                                       
  bank: bank.required(),
  account_type: account_type.required(),
  account_number: account_number.required(),
  cash_balance,
  line_of_credit_balance,
  credit_balance,
  currency,
  tag,
})

const updateBankAccountSchema = Joi.object({                                                       
  bank,
  account_type,
  account_number,
  cash_balance,
  line_of_credit_balance,
  credit_balance,
  currency,
  tag,
})

const getBankAccountSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createBankAccountSchema, updateBankAccountSchema, getBankAccountSchema }  