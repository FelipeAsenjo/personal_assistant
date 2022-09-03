const { Model, DataTypes, Sequelize } = require('sequelize')

const TASK_TABLE = 'tasks'

const TaskSchema = {
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
  title: {
    allowNull: false,
    type: DataTypes.STRING(100)
  },
  description: DataTypes.STRING,
  priority: {
    allowNull: false,
    type: DataTypes.SMALLINT,
    defaultValue: 0
  },
  is_todo: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  done: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  start_date: DataTypes.DATEONLY,
  start_time: DataTypes.DATE,
  end_date: DataTypes.DATEONLY,
  end_time: DataTypes.DATE,
  period_type: DataTypes.ENUM(['YEAR', 'MONTH', 'WEEK', 'DAY', 'CUSTOM']),
  period_iterator: DataTypes.SMALLINT,
  days: DataTypes.ARRAY(DataTypes.SMALLINT),
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Task extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: 'Task',
      timestamps: true,
      paranoid: true,
    }
  }
}

module.exports = { TASK_TABLE, TaskSchema, Task }