const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");

class Car extends Model { }

Car.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        image: {
            type: DataTypes.BLOB,
            allowNull: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        consume: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        capacity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        liters: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        km: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize: sequelize,
        modelName: 'Car',
        tableName: 'cars'
    }
)

module.exports = {
    Car
}