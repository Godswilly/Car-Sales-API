const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router.route('/').get(carController.getAllCars).post(carController.createCar);

router.route('/:id').get(carController.getCar).patch(carController.updateCar);

module.exports = router;
