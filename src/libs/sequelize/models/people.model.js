const { Model, DataTypes, Sequelize } = require('sequelize')

const PERSON_TABLE = 'people'

const PersonSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
  alias: DataTypes.STRING(50),
  birthday: DataTypes.DATE,
  rut: {
    unique: true,
    type: DataTypes.STRING(10),
    defaultValue: null
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}

class Person extends Model {
  static associate(models) {
    // create relations
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSON_TABLE,
      modelName: 'Person',
      timestamps: true,
      paranoid: true,
    }
  }
}

module.exports = { PERSON_TABLE, PersonSchema, Person }