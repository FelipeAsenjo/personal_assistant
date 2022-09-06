const { Model, DataTypes, Sequelize } = require('sequelize')

const TASK_TAG_JUNCTION_TABLE = 'task_tags_junction'

const TaskTagJunctionSchema = {
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
  tag_id: {
    allowNull: false,
    type: DataTypes.UUID
  },
}

class TaskTagJunction extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TAG_JUNCTION_TABLE,
      modelName: 'TaskTagJunction',
      paranoid: true,
    }
  }
}

module.exports = { TASK_TAG_JUNCTION_TABLE, TaskTagJunctionSchema, TaskTagJunction }