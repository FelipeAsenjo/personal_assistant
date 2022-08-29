require('dotenv').config()
const jwt = require('jsonwebtoken')
const { 
    randomBytes,
    scryptSync, 
    timingSafeEqual, 
} = require('crypto')

const maxAge = '1d'

const randomHex = () => randomBytes(16).toString('base64')

const encryptPass = (password) => {
    const salt = randomHex()
    const encryptedPass = scryptSync(password, salt, 64).toString('base64')

    return `${salt}:${encryptedPass}`
}

const verifyPass = (user, password) => {
    const [salt, key] = user.password.split(':')
    const hashedBuffer = scryptSync(password, salt, 64)

    const keyBuffer = Buffer.from(key, 'base64')
    const match = timingSafeEqual(hashedBuffer, keyBuffer)

    return match
}

const signToken = payload => {
    const signedToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: maxAge }) 
    console.log(maxAge)
    return signedToken
}

module.exports = {
    encryptPass,
    verifyPass,
    signToken,
}