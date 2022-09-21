const { Model, DataTypes, Sequelize } = require('sequelize')

const CONTACT_TABLE = 'contacts'

const ContactSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
  alias: DataTypes.STRING(50),
  birthday: DataTypes.DATE,
  rut: {
    unique: true,
    type: DataTypes.STRING(10),
    defaultValue: null
  },
  favorite: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  blocked: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Contact extends Model {
  static associate(models) {
    // this.belongsTo(models.Person, { as: 'person' })
    this.belongsTo(models.User, { as: 'owner' })

    // this.hasMany(models.ContactTagJunction, { as: 'tags', foreignKey: 'contact_id' })

    // this.belongsToMany(models.ContactTag, {
    //   through: models.ContactsTagsJunction,
    //   foreignKey: 'contact_id',
    //   otherKey: 'tag_id'
    // })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACT_TABLE,
      modelName: 'Contact',
      timestamps: true,
      paranoid: true,
    }
  }
}

module.exports = { CONTACT_TABLE, ContactSchema, Contact }