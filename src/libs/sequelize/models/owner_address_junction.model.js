const { Model, DataTypes, Sequelize } = require('sequelize')

const OWNER_ADDRESS_JUNCTION_TABLE = 'owner_address_junction'

const OwnerAddressJunctionSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  owner_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  address_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
}

class OwnerAddressJunction extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OWNER_ADDRESS_JUNCTION_TABLE,
      modelName: 'OwnerAddressJunction',
      paranoid: true,
    }
  }
}

module.exports = { OWNER_ADDRESS_JUNCTION_TABLE, OwnerAddressJunctionSchema, OwnerAddressJunction }