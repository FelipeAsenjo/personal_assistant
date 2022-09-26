const { Model, DataTypes, Sequelize } = require('sequelize')

const BANK_ACCOUNT_TABLE = 'bank_accounts'

const BankAccountSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: DataTypes.UUID,
  contact_id: DataTypes.UUID,
  bank: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  account_type: {
    allowNull: false,
    type: DataTypes.ENUM(['CORRIENTE', 'VISTA', 'AHORRO', 'OTHER'])
  },
  account_number: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  },
  cash_balance: DataTypes.DECIMAL,
  line_of_credit_balance: DataTypes.DECIMAL,
  credit_balance: DataTypes.DECIMAL,
  currency: {
    allowNull: false,
    type: DataTypes.STRING(10),
    defaultValue: 'CLP'
  },
  tag: DataTypes.STRING(25),
}

class BankAccount extends Model {
  static associate(models) {
    this.hasMany(models.Transfer, { as: 'transfers', foreignKey: 'from_account_id' })
    this.belongsTo(models.Contact, { as: 'contact', foreignKey: 'contact_id' })
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BANK_ACCOUNT_TABLE,
      modelName: 'BankAccount',
      paranoid: true,
      indexes: [
        {
          fields: ['account_number']
        }
      ]
    }
  }
}

module.exports = { BANK_ACCOUNT_TABLE, BankAccountSchema, BankAccount }