const { Model, DataTypes, Sequelize } = require('sequelize')

const CONTACTS_TAGS_JUNCTION_TABLE = 'contacts_tags_junction'

const ContactsTagsJunctionSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  contact_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  contact_tag_id: {
    allowNull: false,
    type: DataTypes.UUID
  }
}

class ContactsTagsJunction extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACTS_TAGS_JUNCTION_TABLE,
      modelName: 'ContactsTagsJunction',
      paranoid: true,
    }
  }
}

module.exports = { CONTACTS_TAGS_JUNCTION_TABLE, ContactsTagsJunctionSchema, ContactsTagsJunction }