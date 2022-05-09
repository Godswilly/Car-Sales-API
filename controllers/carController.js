const Car = require('../models/carModel');

exports.createCar = async (req, res) => {
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

exports.getAllCars = async (req, res) => {
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
