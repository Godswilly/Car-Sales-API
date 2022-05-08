const mongoose = require('mongoose');
const slugify = require('slugify');

const carSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A car must have a name'],
		unique: true,
		trim: true,
		maxlength: [20, 'A car name must have less or equal to 20 characters'],
		minlength: [3, 'A car name must have more or equal to 3 characters'],
	},
	price: {
		type: Number,
		required: [true, 'A car must have a price'],
	},
	images: [String],
	model: {
		type: String,
		required: [true, 'A car must have a model'],
	},
	description: {
		type: String,
		trim: true,
		required: [true, 'A car must have a description'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	year: {
		type: Number,
		required: [true, 'A car must have a manufacture year'],
	},
	mileage: {
		type: Number,
		required: [true, 'A car must have milage record'],
	},
	brand: {
		type: String,
		required: [true, 'A car must have a brand name'],
		enum: {
			values: [
				'BMW',
				'Mercedes Benz',
				'Audi',
				'Toyota',
				'Innoson',
				'Tesla',
				'Hondai',
			],
			message:
				'Brand name should either be: BMW, Mercedes Benz, Audi, Toyota, Innoson, Tesla, Hondai',
		},
	},
	slug: String,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
