const { Model, DataTypes, Sequelize } = require('sequelize')

const SOCIAL_MEDIA_TABLE = 'social_media'

const SocialMediaSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: DataTypes.UUID,
  contact_id: DataTypes.UUID,
  service: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(50),
  },
  link: DataTypes.STRING(150),
  tag: DataTypes.STRING(25)
}

class SocialMedia extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    this.belongsTo(models.Contact, { as: 'contact', foreignKey: 'contact_id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOCIAL_MEDIA_TABLE,
      modelName: 'SocialMedia',
      paranoid: true,
      indexes: [
        {
          fields: ['username']
        }
      ]
    }
  }
}

module.exports = { SOCIAL_MEDIA_TABLE, SocialMediaSchema, SocialMedia }