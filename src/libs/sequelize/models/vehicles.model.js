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
  owner_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  type: {
    type: DataTypes.ENUM(['BUS', 'JEEP', 'VAN', 'CAR', 'MOTORBIKE']),
    unique: true,
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
    this.belongsToMany(models.Person, {
      through: 'person_vehicle_junction',
      foreignKey: 'vehicle_id',
      otherKey: 'person_id',
      as: 'owner'
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