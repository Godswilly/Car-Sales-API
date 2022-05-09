const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router
	.route('/')
	.post(carController.createCar);

  module.exports = router;
