// Import Basic modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconn');

// Import routes
const filtersRouter = require('./routes/filters');

// Initialize app
const app = express();

// Set neccessary headers (to prevent CORS errors)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Connect to database
db.connect().then(() => {
  console.log('Successfully connected to postgresSQL!');
}).catch((err) => {
  console.log('Unable to connect to postgresSQL!', err);
});

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      const error = new Error('Bad request');
      error.status = 400;
      next(error);
    }
    return next();
  });
});

// Route requests to specific URI
app.use('/api/filters', filtersRouter);

// Handle error
app.use((req, res, next) => {
  // If this middleware is executed then endpoint requested for wasn't expected
  const error = new Error('Resource not to found');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.log(error);
  res.status(status).json({
    status: 'error',
    error: status !== 500 ? error.message : "Sorry, we couldn't complete your request please try again",
  });
});

// Export app
module.exports = app;
