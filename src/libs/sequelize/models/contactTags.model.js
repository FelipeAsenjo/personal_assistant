const { Model, DataTypes, Sequelize } = require('sequelize')

const CONTACT_TAG_TABLE = 'contact_tags'

const ContactTagSchema = {
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

class ContactTag extends Model {
  static associate(models) {

    this.belongsToMany(models.Contact, {
      through: 'contacts_tags_junction',
      foreignKey: 'tag_id',
      otherKey: 'contact_id'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACT_TAG_TABLE,
      modelName: 'ContactTag',
      paranoid: true,
    }
  }
}

module.exports = { CONTACT_TAG_TABLE, ContactTagSchema, ContactTag }