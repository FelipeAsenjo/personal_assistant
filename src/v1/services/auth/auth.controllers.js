const boom = require('@hapi/boom')
const AuthService = require('./auth.services')
const { verifyPass, signToken } = require('../../../utils/auth.utils')

const service = new AuthService()

class AuthController {
    async login(req, res, next) {
        const { username, password } = req.body

        try {
            const user = await service.findByEmail(username)
            if(!user) throw boom.unauthorized('user or password incorrect')

            const match = verifyPass(user, password)
            if(!match) throw boom.unauthorized('user or password incorrect')

            const signedToken = signToken({ id: user.id, role: user.role })

            res.cookie('token', signedToken, { httpOnly: true })
            res.status(200).json({ user: user.id })
        } catch(error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            res.cookie('token', '', { maxAge: 1 })
            res.redirect('/')
        } catch(error) {
            next(error)
        }
    }
}

module.exports = AuthController