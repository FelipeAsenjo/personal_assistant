const { Model, DataTypes, Sequelize } = require('sequelize')

const CONTACT_TAGS_TABLE = 'contact_tags'

const ContactTagsSchema = {
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
  name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  color: {
    type: DataTypes.STRING(9), 
    defaultValue: '#555'
  }
}

class ContactTags extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACT_TAGS_TABLE,
      modelName: 'ContactTags',
      paranoid: true,
    }
  }
}

module.exports = { CONTACT_TAGS_TABLE, ContactTagsSchema, ContactTags }