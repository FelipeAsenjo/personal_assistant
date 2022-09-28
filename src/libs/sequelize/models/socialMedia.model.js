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
  person_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
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
    this.belongsTo(models.Person, { as: 'person', foreignKey: 'person_id' })
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