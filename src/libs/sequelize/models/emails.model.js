const { Model, DataTypes, Sequelize } = require('sequelize')

const EMAIL_TABLE = 'emails'

const EmailSchema = {
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
  address: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(200),
  },
  tag: DataTypes.STRING(25),
}

class Email extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMAIL_TABLE,
      modelName: 'Email',
      paranoid: true,
    }
  }
}

module.exports = { EMAIL_TABLE, EmailSchema, Email }