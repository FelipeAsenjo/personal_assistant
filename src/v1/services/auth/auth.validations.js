const Joi = require('joi')

const username = Joi.string().email()
const password = Joi.string()

const loginSchema = Joi.object({                                                       
  username: username.required(),
  password: password.required(),
})

module.exports = { 
  loginSchema,
}  