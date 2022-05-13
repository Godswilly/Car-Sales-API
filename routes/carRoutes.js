const express = require('express');
const upload = require('../utils/multer');
const carController = require('../controllers/carController');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/myCars', authController.protect, carController.getMyCars);

router
	.route('/')
	.get(carController.getAllCars)
	.post(authController.protect, upload, carController.createCar);

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
