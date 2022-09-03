const { Model, DataTypes, Sequelize } = require('sequelize')

const TASK_TAG_TABLE = 'task_tags'

const TaskTagsSchema = {
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

class TaskTags extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TAG_TABLE,
      modelName: 'TaskTags',
      paranoid: true,
    }
  }
}

module.exports = { TASK_TAG_TABLE, TaskTagsSchema, TaskTags }