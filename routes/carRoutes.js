const express = require('express');
const carController = require('../controllers/carController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(authController.protect, carController.getAllCars)
	.post(carController.createCar);

router
	.route('/:id')
	.get(carController.getCar)
	.patch(carController.updateCar)
	.delete(carController.deleteCar);

module.exports = router;
