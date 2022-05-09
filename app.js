const express = require('express');
const morgan = require('morgan');

const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');
const ErrorHandler = require('./utils/errorHandler');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();

	next();
});
//routes
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
	next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
