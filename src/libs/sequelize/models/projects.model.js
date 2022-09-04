const { Model, DataTypes, Sequelize } = require('sequelize')

const PROJECT_TABLE = 'projects'

const ProjectSchema = {
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
  title: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  description: DataTypes.STRING,
  thoughts: DataTypes.STRING,
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Project extends Model {
  static associate(models) {
    this.hasMany(models.ProjectResources, { as: 'resources', foreignKey: 'project_id' })
    this.hasMany(models.Task, { as: 'tasks', foreignKey: 'project_id' })
    this.belongsTo(models.User, { as: 'owner' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: 'Project',
      timestamps: true,
      paranoid: true,
    }
  }
}

module.exports = { PROJECT_TABLE, ProjectSchema, Project }