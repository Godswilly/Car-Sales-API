const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.signup = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	res.status(201).json({
		status: 'success',
		count: user.length,
		data: {
			user,
		},
	});
});
