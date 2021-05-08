const express = require('express');
const reviewsServices = require('./reviews/index.js');
const reviewsRouter = require('./reviews/routes/reviews.route.js');
// implement database
reviewsServices();

const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reviews', reviewsRouter);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
