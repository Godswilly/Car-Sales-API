const express = require('express');
const morgan = require('morgan');

const carRouter = require('./routes/carRoutes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//routes
app.use('/api/v1/cars', carRouter);

module.exports = app;
