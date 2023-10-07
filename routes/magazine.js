var models = require('../models');
exports.list = function (req, res) {
	models.magazines.findAll({
		where: models.Sequelize.or(
			{ is_deleted: false },
			{ is_deleted: null }
		),
		order: "title asc",
	}).then(function (rows) {
		// Initialize an empty array to store the rows
		const magazineRows = [];

		// Iterate through the rows and build the response
		rows.forEach(function (row) {
			// You can access the attributes of each row using row.dataValues
			const magazineData = {
				id: row.dataValues.id,
				title: row.dataValues.title, // Replace with the actual attribute names
				description: row.dataValues.description,
				monthly_price: row.dataValues.monthly_price,
				is_subscribed: row.dataValues.is_subscribed,
				is_deleted: row.dataValues.is_deleted,
			};
			magazineRows.push(magazineData);
		});
		// Send the response as JSON
		res.json({
			status: "ok",
			items: magazineRows.length,
			data: magazineRows,
		});
	});
};
exports.add = function (req, res) {
	// Check if a magazine with the same title already exists
	if (!req.body.title || req.body.title == "" || req.body.title.trim() == "") {
		res.status(400).json({
			status: "error",
			message: "Please fill the Title",
		});
	}
	if (!req.body.monthly_price || parseFloat(req.body.monthly_price) <= 0 ||
		isNaN(parseFloat(req.body.monthly_price))) {
		res.status(400).json({
			status: "error",
			message: "Please make sure to enter a valid monthly_price.",
		});
	}
	else {
		models.magazines.findOne({
			where: {
				title: req.body.title
			}
		}).then(function (existingMagazine) {
			if (existingMagazine) {
				// A magazine with the same title already exists
				res.status(400).json({
					status: "error",
					message: "A magazine with the same title already exists at ID: " + existingMagazine.id
				});
			} else {
				// Create a new magazine if it doesn't already exist
				var data = {
					title: req.body.title,
					description: req.body.description,
					monthly_price: req.body.monthly_price,
					is_subscribed: req.body.is_subscribed,
					is_deleted: req.body.is_deleted,
				};
				models.magazines.create(data).then(function (newMagazine) {
					res.json({
						status: "ok",
						inserted_id: newMagazine.id
					});
				}).catch(function (err) {
					var errors = [];
					for (var i = 0; i < err.errors.length; i++) {
						errors.push({
							param: err.errors[i].path,
							msg: err.errors[i].message
						});
					}
					res.status(400).json({
						status: "error",
						error: errors
					});
				});
			}
		});
	}
};
exports.detail = function (req, res) {
	// Check if a magazine with the same title already exists
	models.magazines.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (existingMagazine) {
		if (existingMagazine) {
			// A magazine with the same title already exists
			res.status(200).json({
				status: "ok",
				data: existingMagazine
			});
		} else {
			res.status(400).json({
				status: "error",
				message: "Magazine with ID " + req.params.id + " was not found"
			});
		}
	})
};
exports.update = function (req, res) {
	if (req.body.monthly_price && (parseFloat(req.body.monthly_price) <= 0 ||
		isNaN(parseFloat(req.body.monthly_price)))) {
		res.status(400).json({
			status: "error",
			message: "Please make sure to enter a valid monthly_price.",
		});
	}
	else {
		models.magazines.findOne({
			where: {
				id: req.params.id
			}
		}).then(function (existingMagazine) {
			if (existingMagazine) {
				var data = {
					title: req.body.title ?? existingMagazine.title,
					description: req.body.description ?? existingMagazine.description,
					monthly_price: req.body.monthly_price ?? existingMagazine.monthly_price,
					is_subscribed: req.body.is_subscribed ?? existingMagazine.is_subscribed,
					is_deleted: req.body.title ?? existingMagazine.is_deleted,
				};
				models.magazines.update(data, {
					where: {
						id: req.params.id
					}
				}).then(function (newMagazine) {
					res.json({
						status: "ok",
						message: "Record Updated successfully."
					});
				});

			} else {
				res.status(400).json({
					status: "error",
					message: "Magazine with ID " + req.params.id + " was not found"
				});
			}
		})
	}
};

exports.delete = function (req, res) {
	models.magazines.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (existingMagazine) {
		if (existingMagazine) {
			var data = {
				is_deleted: true,
			};
			models.magazines.update(data, {
				where: {
					id: req.params.id
				}
			}).then(function (newMagazine) {
				res.json({
					status: "ok",
					message: "Record Deleted successfully."
				});
			});

		} else {
			res.status(400).json({
				status: "error",
				message: "Magazine with ID " + req.params.id + " was not found"
			});
		}
	})
};
