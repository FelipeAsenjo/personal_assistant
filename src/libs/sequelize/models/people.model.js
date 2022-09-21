const { Model, DataTypes, Sequelize } = require('sequelize')

const PERSON_TABLE = 'people'

const PersonSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: DataTypes.UUID,
  name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  alias: DataTypes.STRING(50),
  birthday: DataTypes.DATE,
  rut: {
    unique: true,
    type: DataTypes.STRING(10),
    defaultValue: null
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

class Person extends Model {
  static associate(models) {
    this.hasOne(models.Contact, { as: 'contact', foreignKey: 'person_id' })
    this.hasMany(models.Phone, { as: 'phone', foreignKey: 'owner_id' })
    this.hasMany(models.SocialMedia, { as: 'social_media', foreignKey: 'owner_id' })
    this.hasMany(models.Email, { as: 'email', foreignKey: 'owner_id' })
    this.hasMany(models.BankAccount, { as: 'bank_account', foreignKey: 'owner_id' })

    this.belongsTo(models.User, { as: 'person' })

    this.belongsToMany(models.Vehicle, { 
      through: models.OwnerVehicleJunction,
      foreignKey: 'owner_id',
      otherKey: 'vehicle_id'
    })
    this.belongsToMany(models.Address, { 
      through: models.OwnerAddressJunction,
      foreignKey: 'owner_id',
      otherKey: 'address_id'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSON_TABLE,
      modelName: 'Person',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          fields: ['alias', 'name', 'last_name', 'rut']
        }
      ]
    }
  }
}

module.exports = { PERSON_TABLE, PersonSchema, Person }