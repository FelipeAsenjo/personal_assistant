const { Address, AddressSchema } = require('./address.model')
const { BankAccount, BankAccountSchema } = require('./bank_account.model')
const { ContactTag, ContactTagSchema } = require('./contact_tags.model')
const { Contact, ContactSchema } = require('./contacts.model')
const { Email, EmailSchema } = require('./emails.model')
const { Inventory, InventorySchema } = require('./inventory.model')
const { Person, PersonSchema } = require('./people.model')
const { Phone, PhoneSchema } = require('./phones.model')
const { ProjectResources, ProjectResourcesSchema } = require('./project_resources.model')
const { Project, ProjectSchema } = require('./projects.model')
const { SocialMedia, SocialMediaSchema } = require('./social_media.model')
const { TaskTag, TaskTagSchema } = require('./task_tags.model')
const { Task, TaskSchema } = require('./tasks.model')
const { Transfer, TransferSchema } = require('./transfers.model')
const { User, UserSchema } = require('./users.model')
const { Vehicle, VehicleSchema } = require('./vehicles.model')
const { WishlistTag, WishlistTagSchema } = require('./wishlist_tags.model')
const { Wishlist, WishlistSchema } = require('./wishlist.model')

const { ContactTagJunction, ContactTagJunctionSchema } = require('./contacts_tags_junction.model')
const { TaskTagJunction, TaskTagJunctionSchema } = require('./task_tag_junction.model')
const { WishlistTagJunction, WishlistTagJunctionSchema } = require('./wishlist_tags_junction.model')
const { OwnerAddressJunction, OwnerAddressJunctionSchema } = require('./owner_address_junction.model')
const { OwnerVehicleJunction, OwnerVehicleJunctionSchema } = require('./owner_vehicle_junction.model')

function setupModels(sequelize) {
  Address.init(AddressSchema, Address.config(sequelize))
  BankAccount.init(BankAccountSchema, BankAccount.config(sequelize))
  ContactTag.init(ContactTagSchema, ContactTag.config(sequelize))
  Contact.init(ContactSchema, Contact.config(sequelize))
  Email.init(EmailSchema, Email.config(sequelize))
  Inventory.init(InventorySchema, Inventory.config(sequelize))
  Person.init(PersonSchema, Person.config(sequelize))
  Phone.init(PhoneSchema, Phone.config(sequelize))
  ProjectResources.init(ProjectResourcesSchema, ProjectResources.config(sequelize))
  Project.init(ProjectSchema, Project.config(sequelize))
  SocialMedia.init(SocialMediaSchema, SocialMedia.config(sequelize))
  TaskTag.init(TaskTagSchema, TaskTag.config(sequelize))
  Task.init(TaskSchema, Task.config(sequelize))
  Transfer.init(TransferSchema, Transfer.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  Vehicle.init(VehicleSchema, Vehicle.config(sequelize))
  WishlistTag.init(WishlistTagSchema, WishlistTag.config(sequelize))
  Wishlist.init(WishlistSchema, Wishlist.config(sequelize))


  Person.associate(sequelize.models)
  User.associate(sequelize.models)
  Contact.associate(sequelize.models)
  Task.associate(sequelize.models)
  Inventory.associate(sequelize.models)
  Project.associate(sequelize.models)
  Wishlist.associate(sequelize.models)
  Phone.associate(sequelize.models)
  SocialMedia.associate(sequelize.models)
  Email.associate(sequelize.models)
  BankAccount.associate(sequelize.models)
  Address.associate(sequelize.models)
  Vehicle.associate(sequelize.models)
}

module.exports = setupModels