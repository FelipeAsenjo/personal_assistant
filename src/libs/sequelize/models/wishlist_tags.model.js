const { Model, DataTypes, Sequelize } = require('sequelize')

const WISHLIST_TAG_TABLE = 'wishlist_tags'

const WishlistTagSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  wishlist_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  color: {
    type: DataTypes.STRING(9), 
    defaultValue: '#555'
  }
}

class WishlistTag extends Model {
  static associate(models) {
    this.belongsToMany(models.Wishlist, {
      through: models.WishlistTagJunction,
      foreignKey: 'tag_id',
      otherKey: 'wishlist_id'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WISHLIST_TAG_TABLE,
      modelName: 'WishlistTag',
      paranoid: true,
    }
  }
}

module.exports = { WISHLIST_TAG_TABLE, WishlistTagSchema, WishlistTag }