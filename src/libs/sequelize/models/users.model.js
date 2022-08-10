const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  }
}

class User extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }