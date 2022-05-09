const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name'],
		minlength: [3, 'Name must have more or equal to 3 characters'],
		maxlength: [20, 'Name must have less or equal to 20 characters'],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please enter an email'],
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: [6, 'Minimum password length must be 6 characters'],
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: 'Passwords are not the same!!',
		},
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);

	this.confirmPassword = undefined;
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
