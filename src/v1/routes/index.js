const express = require('express')
const auth = require('../services/auth/auth.routes')
const address = require('../services/address/address.routes')
const bankAccounts = require('../services/bankAccounts/bankAccounts.routes')
const contacts = require('../services/contacts/contacts.routes')
const emails = require('../services/emails/emails.routes')
const inventory = require('../services/inventory/inventory.routes')
const people = require('../services/people/people.routes')
const phones = require('../services/phones/phones.routes')
const projectResources = require('../services/projectResources/projectResources.routes')
const projects = require('../services/projects/projects.routes')
const socialMedia = require('../services/socialMedia/socialMedia.routes')
const tasks = require('../services/tasks/tasks.routes')
const transfers = require('../services/transfers/transfers.routes')
const users = require('../services/users/users.routes')
const vehicles = require('../services/vehicles/vehicles.routes')
const wishlist = require('../services/wishlist/wishlist.routes')
const { isAuthenticated, hasRole } = require('../../middlewares/auth.handler')

const router = express.Router()

router.use('/auth', auth)
router.use('/users', isAuthenticated, hasRole([0, 1]), users)

// we are receiveing id and role from cookies
// so we don't need to nest other routers into users
router.use('/tasks',
 isAuthenticated, 
tasks)

module.exports = router