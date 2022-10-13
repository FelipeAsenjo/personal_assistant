const express = require('express')
const WishlistController = require('./wishlist.controllers')
const validatorHandler = require('../../../middlewares/validator.handler')
const { 
    updateWishlistSchema,
    createWishlistSchema,
    getWishlistSchema
} = require('./wishlist.validations')

const router = express.Router()
const controller = new WishlistController()

router.get('/', 
    controller.findAll
)

router.get('/:id',
    validatorHandler(getWishlistSchema, 'params'),
    controller.findOne
)

router.post('/', 
    validatorHandler(createWishlistSchema, 'body'),
    controller.create
)

router.patch('/:id',
    validatorHandler(getWishlistSchema, 'params'),
    validatorHandler(updateWishlistSchema, 'body'),
    controller.updateOne
)

router.delete('/:id',
    validatorHandler(getWishlistSchema, 'params'),
    controller.deleteOne
)

router.post('/findByName', 
    validatorHandler(updateWishlistSchema, 'body'),
    controller.findByItemName
)

router.post('/findByfavorite', 
    validatorHandler(updateWishlistSchema, 'body'),
    controller.findByFavorite
)

module.exports = router