const User = require('../models/userModel');

exports.createUser = async (req, res, next) => {
	try {
		const user = await User.create(req.body);

		res.status(201).json({
			status: 'success',
			count: user.length,
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};
exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});

		res.status(200).json({
			status: 'success',
			count: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};
