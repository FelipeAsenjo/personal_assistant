const Joi = require('joi')

const id = Joi.string().guid()
const type = Joi.array().valid('BUS', 'JEEP', 'VAN', 'CAR', 'MOTORBIKE')
const brand = Joi.string().max(30)
const model = Joi.string().max(30)
const year = Joi.number()
const plate_number = Joi.string().max(10)
const fuel_consumption = Joi.number()

const createVehicleSchema = Joi.object({                                                       
  type,
  brand,
  model,
  year,
  plate_number,
  fuel_consumption,
})

const updateVehicleSchema = Joi.object({                                                       
  type,
  brand,
  model,
  year,
  plate_number,
  fuel_consumption,
})

const getVehicleSchema = Joi.object({
  id: id.required()
})
 
module.exports = { createVehicleSchema, updateVehicleSchema, getVehicleSchema }  