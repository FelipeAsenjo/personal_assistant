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
  person_id: DataTypes.UUID,
  user_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  alias: DataTypes.STRING(50),
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
  tags: DataTypes.JSON(),
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
    this.belongsTo(models.Person, { as: 'person', foreignKey: 'person_id' })
    this.belongsTo(models.User, { as: 'owner', foreignKey: 'user_id' })

    this.hasMany(models.Vehicle, { as: 'vehicle', foreignKey: 'contact_id' })
    this.hasMany(models.Address, { as: 'address', foreignKey: 'contact_id' })
    this.hasMany(models.Phone, { as: 'phones', foreignKey: 'contact_id' })
    this.hasMany(models.SocialMedia, { as: 'socialMedia', foreignKey: 'contact_id' })
    this.hasMany(models.BankAccount, { as: 'bankAccount', foreignKey: 'contact_id' })
    this.hasMany(models.Email, { as: 'emails', foreignKey: 'contact_id' })

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACT_TABLE,
      modelName: 'Contact',
      timestamps: true,
      paranoid: true,
      indexes: [{
        fields: ['alias']
      }]
    }
  }
}

module.exports = { CONTACT_TABLE, ContactSchema, Contact }