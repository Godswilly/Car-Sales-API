const Car = require('../models/carModel');

exports.createCar = async (req, res, next) => {
	try {
		const car = await Car.create(req.body);

		res.status(201).json({
			status: 'success',
			count: car.length,
			data: {
				car,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.getAllCars = async (req, res, next) => {
	try {
		const cars = await Car.find({});

		res.status(200).json({
			status: 'success',
			count: cars.length,
			data: {
				cars,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.getCar = async (req, res, next) => {
	try {
		const car = await Car.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				car,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.updateCar = async (req, res, next) => {
	try {
		const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			count: car.length,
			data: {
				car,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};
exports.deleteCar = async (req, res, next) => {
	try {
		await Car.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};
