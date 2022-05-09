const Car = require('../models/carModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.createCar = asyncHandler(async (req, res, next) => {
	const car = await Car.create(req.body);

	res.status(201).json({
		status: 'success',
		count: car.length,
		data: {
			car,
		},
	});
});

exports.getAllCars = asyncHandler(async (req, res, next) => {
	const cars = await Car.find({});

	res.status(200).json({
		status: 'success',
		count: cars.length,
		data: {
			cars,
		},
	});
});

exports.getCar = asyncHandler(async (req, res, next) => {
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

exports.updateCar = asyncHandler(async (req, res, next) => {
	const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!car) {
		throw new ErrorHandler('No car found with the given ID', 404);
	}

	res.status(200).json({
		status: 'success',
		count: car.length,
		data: {
			car,
		},
	});
});

exports.deleteCar = asyncHandler(async (req, res, next) => {
	const car = await Car.findByIdAndDelete(req.params.id);

	if (!car) {
		throw new ErrorHandler('No car found with the given ID', 404);
	}

	res.status(204).json({
		status: 'Car deleted successfully',
		data: null,
	});
});
