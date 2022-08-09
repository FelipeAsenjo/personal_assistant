const { DataTypes, Model } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}

class User extends Model {
    static associate() {
        // table relations
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User'
        }
    }
}

module.exports = {USER_TABLE, UserSchema, User}