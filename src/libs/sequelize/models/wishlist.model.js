const { Model, DataTypes, Sequelize } = require('sequelize')

const WISHLIST_TABLE = 'wishlist'

const WishlistSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  item_name: {
    allowNull: false,
    type: DataTypes.STRING(100)
  },
  description: DataTypes.STRING,
  brand: DataTypes.STRING(30),
  model: DataTypes.STRING(30),
  specs: DataTypes.STRING,
  done: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  favorite: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tags: DataTypes.JSON(),
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Wishlist extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'owner', foreignKey: 'user_id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WISHLIST_TABLE,
      modelName: 'Wishlist',
      timestamps: true,
      paranoid: true,
    }
  }
}

module.exports = { WISHLIST_TABLE, WishlistSchema, Wishlist }