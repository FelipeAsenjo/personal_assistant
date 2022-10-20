const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config')

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token
    if(!token) throw boom.forbidden('jwt is invalid or expired')
    
    jwt.verify(token, JWT_KEY, (err, user) => {
        if(err) throw boom.forbidden('jwt is invalid or expired')
        req.user = user

        next()
    })
}

const hasRole = (allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.user
        const isAuthorized = allowedRoles.includes(Number(role))
        if(!isAuthorized) throw boom.forbidden('jwt is invalid or expired')

        next()
    }
}

module.exports = {
    isAuthenticated,
    hasRole
}