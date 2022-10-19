const { Model, DataTypes, Sequelize } = require('sequelize')

const TRANSFER_TABLE = 'transfers'

const TransferSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  user_account_id: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  other_account_id: DataTypes.UUID,
  service: DataTypes.STRING(50),
  is_income: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  currency: {
    allowNull: false,
    type: DataTypes.STRING(10),
    defaultValue: 'CLP'
  },
  description: DataTypes.STRING,
  standby: { // debts
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  period_type: DataTypes.ENUM(['YEAR', 'MONTH', 'WEEK', 'DAY', 'CUSTOM']),
  period_iterator: DataTypes.SMALLINT,
  schedules_at: DataTypes.DATE,
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Transfer extends Model {
  static associate(models) {
    this.belongsTo(models.BankAccount, { as: 'user_account', foreignKey: 'user_account_id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TRANSFER_TABLE,
      modelName: 'Transfer',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          fields: ['user_account_id', 'other_account_id']
        }
      ]
    }
  }
}

module.exports = { TRANSFER_TABLE, TransferSchema, Transfer }