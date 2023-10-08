var models = require('../models');

exports.list = function (req, res) {
	models.magazine_log
		.findAll({
			order: "id desc",
		})
		.then(function (rows) {
			const magazineLogRows = [];
			const promises = rows.map(function (row) {
				return models.magazines.findOne({
					where: {
						id: row.dataValues.magazine_id,
					},
				}).then(function (magazine) {
					const magazineData = {
						magazine_id: row.dataValues.magazine_id,
						magazine_title: magazine ? magazine.title : null,
						log_date: row.dataValues.log_date,
						action_status: row.dataValues.action_status,
					};
					magazineLogRows.push(magazineData);
				});
			});

			Promise.all(promises)
				.then(() => {
					res.json({
						status: "ok",
						items: magazineLogRows.length,
						data: magazineLogRows,
					});
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json({
						status: "error",
						message: "Internal server error",
					});
				});
		});
};

exports.add = function (req, res) {
	models.magazines.findOne({
		where: {
			id: req.body.magazine_id
		}
	}).then(function (existingMagazine) {
		
		if (existingMagazine) {
			
			// The magazine exists => add the log
			var data = {
				magazine_id: req.body.magazine_id,
				log_date: req.body.log_date,
				action_status: req.body.action_status
			};
			models.magazine_log.create(data).then(function (newMagazineLog) {
				res.json({
					status: "ok",
					inserted_id: newMagazineLog.id
				});
			});
		} else {
			res.status(400).json({
				status: "error",
				message: "Magazine with ID " + req.body.magazine_id + " was not found."
			});
		}
	});
};
