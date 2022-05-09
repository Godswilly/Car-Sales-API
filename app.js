const express = require('express');
const morgan = require('morgan');

const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//routes
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
