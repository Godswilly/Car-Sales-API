const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
	price: {
		type: Number,
		required: [true, 'A car must have a price'],
	},
	images: [String],
	carModel: {
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
	mileage: {
		type: Number,
		required: [true, 'A car must have milage record'],
	},
	carMake: {
		type: String,
		required: [true, 'A car must have a make'],
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
				'Make should either be: BMW, Mercedes Benz, Audi, Toyota, Innoson, Tesla, Hondai',
		},
	 },
	year: {
		type: String,
		required: [true, 'A car must have a manufacture year'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Car must belong to a user.'],
	},
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
