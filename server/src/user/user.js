const { Model, DataTypes } = require("sequelize");
const Bcrypt = require('bcrypt');
const { sequelize } = require("../database");

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: sequelize,
        modelName: 'User',
        tableName: 'users'
    }
)

User.beforeCreate((user) => {
    user.password = Bcrypt.hashSync(user.password, 10)
})

module.exports = {
    User
}