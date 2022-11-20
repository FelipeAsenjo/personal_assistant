const { Model, DataTypes, Sequelize } = require('sequelize')

const EMAIL_TABLE = 'emails'

const EmailSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: DataTypes.UUID,
  contact_id: DataTypes.UUID,
  address: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(200),
  },
  tags: DataTypes.STRING(25),
}

class Email extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    this.belongsTo(models.Contact, { as: 'contact', foreignKey: 'contact_id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMAIL_TABLE,
      modelName: 'Email',
      paranoid: true,
      indexes: [
        {
          fields: ['address']
        }
      ]
    }
  }
}

module.exports = { EMAIL_TABLE, EmailSchema, Email }
