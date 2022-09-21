const Joi = require('joi')

const id = Joi.string().guid()
const title = Joi.string().max(100)
const description = Joi.string()
const priority = Joi.number()
const is_todo = Joi.bool()
const done = Joi.bool()
const start_date = Joi.date()
const start_time = Joi.date().timestamp('unix')
const end_date = Joi.date()
const end_time = Joi.date().timestamp('unix')
const period_type = Joi.string().valid('YEAR', 'MONTH', 'WEEK', 'DAY', 'CUSTOM')
const period_iterator = Joi.number()
const numberOfDays = Joi.number().min(0).max(6)
const days = Joi.array().items(numberOfDays)

const createTaskSchema = Joi.object({                                                       
  title: title.required(),
  description,
  priority,
  is_todo,
  done,
  start_date,
  start_time,
  end_date,
  end_time,
  period_type,
  period_iterator,
  days
})

const updateTaskSchema = Joi.object({                                                       
  title,
  description,
  priority,
  is_todo,
  done,
  start_date,
  start_time,
  end_date,
  end_time,
  period_type,
  period_iterator,
  days
})

const getTaskSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema }  