const { Model, DataTypes, Sequelize } = require('sequelize')

const PHONE_TABLE = 'phones'

const PhoneSchema = {
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
  country_code: DataTypes.SMALLINT,
  number: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  },
  tag: DataTypes.STRING(25)
}

class Phone extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PHONE_TABLE,
      modelName: 'Phone',
      paranoid: true,
    }
  }
}

module.exports = { PHONE_TABLE, PhoneSchema, Phone }