const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.signup = asyncHandler(async (req, res) => {
	const newUser = await User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		passwordChangedAt: req.body.passwordChangedAt,
	});

	const token = signToken(newUser._id);

	res.status(201).json({
		status: 'success',
		token,
		data: {
			user: newUser,
		},
	});
});

exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ErrorHandler('Please enter your email and password', 400);
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		throw new ErrorHandler('Incorrect email or password', 401);
	}

	const token = signToken(user._id);
	res.status(200).json({
		status: 'success',
		token,
	});
});

exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		throw new ErrorHandler(
			'You are not logged in! Please log in to get access.',
			401
		);
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);

	if (!currentUser) {
		throw new ErrorHandler(
			'The user belonging to this token no longer exist.',
			401
		);
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		throw new ErrorHandler(
			'User recently changed password! Please log in again.',
			401
		);
	}

	req.user = currentUser;

	next();
});

exports.roleAccess =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new ErrorHandler(
				'You do not have permission to perform this action',
				403
			);
		}
		next();
	};
