"use strict";

module.exports = function (sequelize, DataTypes) {
	var MagazineLog = sequelize.define("magazine_log", {
		magazine_id: DataTypes.INTEGER,
		log_date: DataTypes.TEXT,
		action_status: DataTypes.TEXT
	},
		{
			timestamps: false,
		});
	return MagazineLog;
};
