const express = require('express')
const BankAccountController = require('./bankAccounts.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateBankAccountSchema,
    createBankAccountSchema,
    getBankAccountSchema
} = require('./bankAccounts.validations')

const router = express.Router({mergeParams: true})
const controller = new BankAccountController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getBankAccountSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createBankAccountSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getBankAccountSchema, 'params'),
    validatorHandler(updateBankAccountSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getBankAccountSchema, 'params'),
    controller.deleteOne
)

router.post('/findMyOwn', controller.findMyOwn)

module.exports = router