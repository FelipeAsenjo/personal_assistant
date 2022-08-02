const express = require('express')

const UserService = require('./service')
const validatorHandler = require('../../middlewares/validator.handler')
const { updateUserSchema, createUserSchema, getUserSchema } = require('./validations')

const router = express.Router()
const service = new UserService()

router.get('/', async (req, res, next) => {
    try {

        res.send('hola pollo')
    } catch(error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {

    } catch(error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {

    } catch(error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {

    } catch(error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {

    } catch(error) {
        next(error)
    }
})

module.exports = router