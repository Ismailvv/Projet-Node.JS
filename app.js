const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const mongoose = require('./data/import-data');

/* dotenv */
const dotenv = require('dotenv');
dotenv.config();

/* routes */
const booksRouter = require('./routes/BookRoutes');
const userRouter = require('./routes/UserRoutes');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/users', userRouter);

app.use(function (req, res, next) {
    next(createError(404));
  });

app.use(function (err, req, res, next) {
console.log(err.stack);

err.statusCode = err.statusCode || 500;
err.status = err.status || 'error';

res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
});
});

module.exports = app;
