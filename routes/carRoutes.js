const express = require('express');
const carController = require('../controllers/carController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(carController.getAllCars)
	.post(
		authController.protect,
		authController.roleAccess('admin', 'user'),
		carController.createCar
	);

router
	.route('/:id')
	.get(carController.getCar)
	.patch(
		authController.protect,
		authController.roleAccess('user'),
		carController.updateCar
	)
	.delete(
		authController.protect,
		authController.roleAccess('user'),
		carController.deleteCar
	);

module.exports = router;
