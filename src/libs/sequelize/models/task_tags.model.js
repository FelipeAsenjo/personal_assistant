const { Model, DataTypes, Sequelize } = require('sequelize')

const TASK_TAG_TABLE = 'task_tags'

const TaskTagSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  task_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  color: {
    type: DataTypes.STRING(9), 
    defaultValue: '#555'
  }
}

class TaskTag extends Model {
  static associate(models) {
    this.belongsToMany(models.Task, {
      through: 'task_tags_junction',
      foreignKey: 'tag_id',
      otherKey: 'task_id'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TAG_TABLE,
      modelName: 'TaskTag',
      paranoid: true,
    }
  }
}

module.exports = { TASK_TAG_TABLE, TaskTagSchema, TaskTag }