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

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        year: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.STRING,
            allowNull: false
        },

        fuel: {
            type: DataTypes.STRING,
            allowNull: false
        },

        personCapacity: {
            type: DataTypes.STRING,
            allowNull: false
        },

        maxLiters: {
            type: DataTypes.STRING,
            allowNull: false
        },

        km: {
            type: DataTypes.STRING,
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