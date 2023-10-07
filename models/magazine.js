"use strict";

module.exports = function (sequelize, DataTypes) {
	var Magazine = sequelize.define("magazines", {
		title: DataTypes.TEXT,
		description: DataTypes.TEXT,
		monthly_price: DataTypes.FLOAT,
		is_subscribed: DataTypes.BOOLEAN,
		is_deleted: DataTypes.BOOLEAN
	},
		{
			timestamps: false,
		});
	return Magazine;
};
