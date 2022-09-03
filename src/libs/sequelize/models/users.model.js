const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
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
  username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(50),
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM([0, 1, 2, 3, 4, 5]),
    allowNull: false,
    defaultValue: 4
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

class User extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }