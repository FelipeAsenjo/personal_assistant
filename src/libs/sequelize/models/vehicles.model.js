const { Model, DataTypes, Sequelize } = require('sequelize')

const VEHICLE_TABLE = 'vehicles'

const VehicleSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: DataTypes.UUID,
  contact_id: DataTypes.UUID,
  type: {
    type: DataTypes.ENUM(['BUS', 'JEEP', 'VAN', 'CAR', 'MOTORBIKE']),
    allowNull: false
  },
  brand: DataTypes.STRING(30),
  model: DataTypes.STRING(30),
  year: DataTypes.SMALLINT,
  plate_number: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(10)
  },
  fuel_consumption: DataTypes.SMALLINT, // Km/L
}

class Vehicle extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'user_vehicle_junction',
      foreignKey: 'vehicle_id',
      otherKey: 'user_id',
      as: 'user'
    })
    this.belongsToMany(models.Contact, {
      through: 'contact_vehicle_junction',
      foreignKey: 'vehicle_id',
      otherKey: 'contact_id',
      as: 'contact'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VEHICLE_TABLE,
      modelName: 'Vehicle',
      paranoid: true,
      indexes: [
        {
          fields: ['plate_number']
        }
      ]
    }
  }
}

module.exports = { VEHICLE_TABLE, VehicleSchema, Vehicle }