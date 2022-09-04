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
  owner_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  service: {
    allowNull: false,
    type: DataTypes.STRING(30)
  },
  account_name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(50),
  },
  link: DataTypes.STRING(150),
  tag: DataTypes.STRING(25)
}

class SocialMedia extends Model {
  static associate(models) {
    this.belongsTo(models.Person, { as: 'owner' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOCIAL_MEDIA_TABLE,
      modelName: 'SocialMedia',
      paranoid: true,
      indexes: [
        {
          fields: ['account_name']
        }
      ]
    }
  }
}

module.exports = { SOCIAL_MEDIA_TABLE, SocialMediaSchema, SocialMedia }