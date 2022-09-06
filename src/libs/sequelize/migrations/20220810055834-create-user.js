'use strict';

const { ADDRESS_TABLE, AddressSchema } = require('../models/address.model')
const { BANK_ACCOUNT_TABLE, BankAccountSchema } = require('../models/bank_account.model')
const { CONTACT_TAG_TABLE, ContactTagSchema } = require('../models/contact_tags.model')
const { CONTACT_TABLE, ContactSchema } = require('../models/contacts.model')
const { EMAIL_TABLE, EmailSchema } = require('../models/emails.model')
const { INVENTORY_TABLE, InventorySchema } = require('../models/inventory.model')
const { PERSON_TABLE, PersonSchema } = require('../models/people.model')
const { PHONE_TABLE, PhoneSchema } = require('../models/phones.model')
const { PROJECT_RESOURCES_TABLE, ProjectResourcesSchema } = require('../models/project_resources.model')
const { PROJECT_TABLE, ProjectSchema } = require('../models/projects.model')
const { SOCIAL_MEDIA_TABLE, SocialMediaSchema } = require('../models/social_media.model')
const { TASK_TAG_TABLE, TaskTagSchema } = require('../models/task_tags.model')
const { TASK_TABLE, TaskSchema } = require('../models/tasks.model')
const { TRANSFER_TABLE, TransferSchema } = require('../models/transfers.model')
const { USER_TABLE, UserSchema } = require('../models/users.model')
const { VEHICLE_TABLE, VehicleSchema } = require('../models/vehicles.model')
const { WISHLIST_TAG_TABLE, WishlistTagSchema } = require('../models/wishlist_tags.model')
const { WISHLIST_TABLE, WishlistSchema } = require('../models/wishlist.model')

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(ADDRESS_TABLE, AddressSchema);
     await queryInterface.createTable(BANK_ACCOUNT_TABLE, BankAccountSchema);
     await queryInterface.createTable(CONTACT_TAG_TABLE, ContactTagSchema);
     await queryInterface.createTable(CONTACT_TABLE, ContactSchema);
     await queryInterface.createTable(EMAIL_TABLE, EmailSchema);
     await queryInterface.createTable(INVENTORY_TABLE, InventorySchema);
     await queryInterface.createTable(PERSON_TABLE, PersonSchema);
     await queryInterface.createTable(PHONE_TABLE, PhoneSchema);
     await queryInterface.createTable(PROJECT_RESOURCES_TABLE, ProjectResourcesSchema);
     await queryInterface.createTable(PROJECT_TABLE, ProjectSchema);
     await queryInterface.createTable(SOCIAL_MEDIA_TABLE, SocialMediaSchema);
     await queryInterface.createTable(TASK_TAG_TABLE, TaskTagSchema);
     await queryInterface.createTable(TASK_TABLE, TaskSchema);
     await queryInterface.createTable(TRANSFER_TABLE, TransferSchema);
     await queryInterface.createTable(USER_TABLE, UserSchema);
     await queryInterface.createTable(VEHICLE_TABLE, VehicleSchema);
     await queryInterface.createTable(WISHLIST_TAG_TABLE, WishlistTagSchema);
     await queryInterface.createTable(WISHLIST_TABLE, WishlistSchema);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable(ADDRESS_TABLE, AddressSchema);
     await queryInterface.dropTable(BANK_ACCOUNT_TABLE, BankAccountSchema);
     await queryInterface.dropTable(CONTACT_TAG_TABLE, ContactTagSchema);
     await queryInterface.dropTable(CONTACT_TABLE, ContactSchema);
     await queryInterface.dropTable(EMAIL_TABLE, EmailSchema);
     await queryInterface.dropTable(INVENTORY_TABLE, InventorySchema);
     await queryInterface.dropTable(PERSON_TABLE, PersonSchema);
     await queryInterface.dropTable(PHONE_TABLE, PhoneSchema);
     await queryInterface.dropTable(PROJECT_RESOURCES_TABLE, ProjectResourcesSchema);
     await queryInterface.dropTable(PROJECT_TABLE, ProjectSchema);
     await queryInterface.dropTable(SOCIAL_MEDIA_TABLE, SocialMediaSchema);
     await queryInterface.dropTable(TASK_TAG_TABLE, TaskTagSchema);
     await queryInterface.dropTable(TASK_TABLE, TaskSchema);
     await queryInterface.dropTable(TRANSFER_TABLE, TransferSchema);
     await queryInterface.dropTable(USER_TABLE, UserSchema);
     await queryInterface.dropTable(VEHICLE_TABLE, VehicleSchema);
     await queryInterface.dropTable(WISHLIST_TAG_TABLE, WishlistTagSchema);
     await queryInterface.dropTable(WISHLIST_TABLE, WishlistSchema);
  }
};
