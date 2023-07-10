const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const { User } = require("../user/user");
const { Car } = require("../car/car");

class Rented extends Model {}

Rented.init(
  	{
    	id: {
      		type: DataTypes.UUID,
      		defaultValue: DataTypes.UUIDV4,
      		primaryKey: true,
    	},
    
		startDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},

		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("pending", "approved", "rejected"),
			allowNull: false,
			defaultValue: "pending",
		},
  	},
  	{
    	sequelize,
		modelName: "Rented",
		tableName: "renteds",
	}
);

// Definindo a relação de associação entre o modelo User e o modelo Rented
Rented.belongsTo(User);

// Definindo a relação de associação entre o modelo Car e o modelo Rented
Rented.belongsTo(Car);

module.exports = {
    Rented,
};
