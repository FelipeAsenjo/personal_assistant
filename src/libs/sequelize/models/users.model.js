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
  name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(255)
  },
  role: {
    type: DataTypes.INTEGER,
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
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }