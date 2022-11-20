const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config')
const { 
    randomBytes,
    scryptSync, 
    timingSafeEqual, 
} = require('crypto')

const maxAge = '1d'

const randomHex = () => randomBytes(16).toString('base64')

const encryptPass = (password) => {
    const salt = randomHex()
    const encryptedPass = scryptSync(password, salt, 32).toString('base64')

    return `${salt}:${encryptedPass}`
}

const verifyPass = (user, password) => {
    const [salt, key] = user.password.split(':')
    const hashedBuffer = scryptSync(password, salt, 32)

    const keyBuffer = Buffer.from(key, 'base64')
    const match = timingSafeEqual(hashedBuffer, keyBuffer)

    return match
}

const signToken = payload => {
    const signedToken = jwt.sign(payload, JWT_KEY, { expiresIn: maxAge }) 
    return signedToken
}

module.exports = {
    encryptPass,
    verifyPass,
    signToken,
}
