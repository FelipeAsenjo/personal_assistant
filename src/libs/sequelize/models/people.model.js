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
  name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
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
    this.hasOne(models.User, { as: 'user', foreignKey: 'person_id' })
    this.hasOne(models.Contact, { as: 'contact', foreignKey: 'person_id' })

    this.belongsToMany(models.Vehicle, { 
      through: 'person_vehicle_junction',
      foreignKey: 'person_id',
      otherKey: 'vehicle_id',
      as: 'vehicle'
    })
    this.belongsToMany(models.Address, { 
      through: 'person_address_junction',
      foreignKey: 'person_id',
      otherKey: 'address_id',
      as: 'address'
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
          fields: ['name', 'last_name', 'rut']
        }
      ]
    }
  }
}

module.exports = { PERSON_TABLE, PersonSchema, Person }