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
    type: DataTypes.ENUM(['0', '1', '2', '3', '4', '5']),
    allowNull: false,
    defaultValue: '4'
  },
  name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
  birthday: DataTypes.DATE,
  rut: {
    unique: true,
    type: DataTypes.STRING(10),
    defaultValue: null
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
    // this.hasOne(models.Person, { as: 'person', foreignKey: 'user_id'})
    // this.hasMany(models.Contact, { as: 'contacts', foreignKey: 'user_id' })
    this.hasMany(models.Task, { as: 'tasks', foreignKey: 'user_id' })
    // this.hasMany(models.Wishlist, { as: 'wishes', foreignKey: 'user_id' })
    // this.hasMany(models.Inventory, { as: 'inventory', foreignKey: 'user_id' })
    // this.hasMany(models.Project, { as: 'projects', foreignKey: 'user_id' })
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