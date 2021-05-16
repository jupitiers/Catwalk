const express = require('express');
const dotenv = require('dotenv');
// run dot config env
dotenv.config();
const reviewsServices = require('./reviews/index.js');
const reviewsRouter = require('./reviews/routes/reviews.route.js');
const cors = require('cors');
// implement database
reviewsServices();

const app = express();
const path = require('path');

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reviews', reviewsRouter);


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
