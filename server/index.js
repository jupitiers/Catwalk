const express = require('express');
const axios = require('axios');
const logger = require('morgan');
const reviewsServices = require('./reviews/index.js');
const reviewsRouter = require('./reviews/routes/reviews.route.js');
require('dotenv').config();
reviewsServices();

const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/reviews', reviewsRouter)

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
