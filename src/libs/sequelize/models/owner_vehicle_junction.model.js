const { Model, DataTypes, Sequelize } = require('sequelize')

const OWNER_VEHICLE_JUNCTION_TABLE = 'owner_vehicles_junction'

const OwnerVehicleJunctionSchema = {
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
  vehicle_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
}

class OwnerVehicleJunction extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OWNER_VEHICLE_JUNCTION_TABLE,
      modelName: 'OwnerVehicleJunction',
      paranoid: true,
    }
  }
}

module.exports = { OWNER_VEHICLE_JUNCTION_TABLE, OwnerVehicleJunctionSchema, OwnerVehicleJunction }