const { Model, DataTypes, Sequelize } = require('sequelize')

const ADDRESS_TABLE = 'addresses'

const AddressSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  street: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.SMALLINT
  },
  apartment: DataTypes.STRING(20),
  city: DataTypes.STRING(100),
  state: DataTypes.STRING(100),
  country: DataTypes.STRING(100),
  tag: DataTypes.STRING(25),
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Address extends Model {
  static associate(models) {
    this.belongsToMany(models.Person, {
      through: 'person_address_junction',
      foreignKey: 'address_id',
      otherKey: 'person_id',
      as: 'owner'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ADDRESS_TABLE,
      modelName: 'Address',
      timestamps: true,
      createdAt: false,
      paranoid: true,
    }
  }
}

module.exports = { ADDRESS_TABLE, AddressSchema, Address }