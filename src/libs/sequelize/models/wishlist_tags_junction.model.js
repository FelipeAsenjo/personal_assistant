const { Model, DataTypes, Sequelize } = require('sequelize')

const WISHLIST_TAG_JUNCTION_TABLE = 'wishlist_tags_junction'

const WishlistTagJunctionSchema = {
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
  tag_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
}

class WishlistTagJunction extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WISHLIST_TAG_JUNCTION_TABLE,
      modelName: 'WishlistTagJunction',
      paranoid: true,
    }
  }
}

module.exports = { WISHLIST_TAG_JUNCTION_TABLE, WishlistTagJunctionSchema, WishlistTagJunction }