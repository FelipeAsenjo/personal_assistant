const { Model, DataTypes, Sequelize } = require('sequelize')

const PROJECT_RESOURCES_TABLE = 'project_resources'

const ProjectResourcesSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  project_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  title: DataTypes.STRING(100),
  description: DataTypes.STRING,
  link: DataTypes.STRING,
}

class ProjectResources extends Model {
  static associate(models) {
    this.belongsTo(models.Project, { as: 'project', foreignKey: 'project_id' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_RESOURCES_TABLE,
      modelName: 'ProjectResources',
      paranoid: true,
    }
  }
}

module.exports = { PROJECT_RESOURCES_TABLE, ProjectResourcesSchema, ProjectResources }