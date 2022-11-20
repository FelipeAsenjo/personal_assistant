const { Model, DataTypes, Sequelize } = require('sequelize')

const INVENTORY_TABLE = 'inventory'

const InventorySchema = {
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
  docs: DataTypes.STRING,
  is_software: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_for_sale: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  specs: DataTypes.STRING,
  tags: DataTypes.JSON,
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Inventory extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'owner', foreignKey: 'user_id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INVENTORY_TABLE,
      modelName: 'Inventory',
      timestamps: true,
      paranoid: true,
    }
  }
}

module.exports = { INVENTORY_TABLE, InventorySchema, Inventory }
