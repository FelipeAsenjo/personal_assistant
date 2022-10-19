const express = require('express')
const auth = require('../services/auth/auth.routes')
const address = require('../services/address/address.routes')
const bankAccounts = require('../services/bankAccounts/bankAccounts.routes')
const contacts = require('../services/contacts/contacts.routes')
const emails = require('../services/emails/emails.routes')
const inventory = require('../services/inventory/inventory.routes')
// const people = require('../services/people/people.routes')
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
const { comesFromContact } = require('../../middlewares/routesOrigin.handler')

const router = express.Router()

const contactsPath = '/contacts/:contact_id'
const projectsPath = '/projects/:project_id'
const bankAccountsPath = '/bankAccounts/:user_account_id'

router.use('/auth', auth)
router.use('/users', 
    // isAuthenticated,
    // hasRole([0, 1]),
    users
)
router.use(`/address`, isAuthenticated, address)
router.use(`${contactsPath}/address`, isAuthenticated, comesFromContact, address)
router.use(`/bankAccounts`, isAuthenticated, bankAccounts)
router.use(`${contactsPath}/bankAccounts`, isAuthenticated, comesFromContact, bankAccounts)
router.use(`/contacts`, isAuthenticated, contacts)
router.use(`/emails`, isAuthenticated, emails)
router.use(`${contactsPath}/emails`, isAuthenticated, comesFromContact, emails)
router.use(`/inventory`, isAuthenticated, inventory)
// router.use(`/people`, isAuthenticated, people)
router.use(`/phones`, isAuthenticated, phones)
router.use(`${contactsPath}/phones`, isAuthenticated, comesFromContact, phones)
router.use(`/projects`, isAuthenticated, projects)
router.use(`${projectsPath}/resources`, isAuthenticated, projectResources)
router.use(`/socialMedia`, isAuthenticated, socialMedia)
router.use(`${contactsPath}/socialMedia`, isAuthenticated, comesFromContact, socialMedia)
router.use(`/tasks`, isAuthenticated, tasks)
router.use(`${bankAccountsPath}/transfers`, isAuthenticated, transfers)
router.use(`/vehicles`, isAuthenticated, vehicles)
router.use(`${contactsPath}/vehicles`, isAuthenticated, comesFromContact, vehicles)
router.use(`/wishlist`, isAuthenticated, wishlist)


module.exports = router