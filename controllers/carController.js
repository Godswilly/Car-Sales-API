const fs = require('fs');
const Car = require('../models/carModel');
const cloudinary = require('../utils/cloudinary');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.createCar = asyncHandler(async (req, res) => {
	const uploader = async (path) => await cloudinary.uploads(path, 'Images');
	const files = await req.files;
	if (!files) {
		throw new ErrorHandler('You must upload a minimum of one image');
	}

	const urls = [];
	const imageList = files.map(async (file) => {
		const { path } = file;
		const newPath = await uploader(path);
		urls.push(newPath.url);
		fs.unlinkSync(path);
	});

	await Promise.all(imageList);

	req.body.images = urls;

	req.body.user = req.user.id;

	const car = await Car.create(req.body);
	car.__v = undefined;

	res.status(201).json({
		status: 'success',
		data: {
			car,
		},
	});
});

exports.getAllCars = asyncHandler(async (req, res) => {
	const cars = await Car.find({});

	res.status(200).json({
		status: 'success',
		count: cars.length,
		data: {
			cars,
		},
	});
});

exports.getCar = asyncHandler(async (req, res) => {
	const car = await Car.findById(req.params.id);

	if (!car) {
		throw new ErrorHandler('No car found with the given ID', 404);
	}

	res.status(200).json({
		status: 'success',
		data: {
			car,
		},
	});
});

exports.updateCar = asyncHandler(async (req, res) => {
	const car = await Car.findOneAndUpdate(
		{ $and: [{ _id: req.params.id }, { user: req.user.id }] },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!car) {
		throw new ErrorHandler('No car found with the given ID', 404);
	}

	res.status(200).json({
		status: 'success',
		data: {
			car,
		},
	});
});

exports.deleteCar = asyncHandler(async (req, res) => {
	const car = await Car.findOneAndDelete({
		$and: [{ _id: req.params.id }, { user: req.user.id }],
	});

	if (!car) {
		throw new ErrorHandler('No car found with the given ID', 404);
	}

	res.status(204).json({
		status: 'Car deleted successfully',
		data: null,
	});
});
