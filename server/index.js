const express = require('express');
const axios = require('axios');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const path = require('path');

const QA = require('./QA/queries.js');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

var calledProducts = {};
app.get('/qa/questions\?', (request, response) => {
  const query = request.url.substring(request.url.indexOf('?'));
  const urlParams = new URLSearchParams(query);
  const productId = urlParams.get('product_id');
  if (Object.keys(calledProducts).length > 5) {
    calledProducts = {};
  }
  if (calledProducts[productId]) {
    response.status(200).json(calledProducts[productId]);
  } else {
    QA.getQuestions(request, response, calledProducts);
  }
});
app.get('/qa/questions/*/answers', QA.getAnswers);
app.get('/*', async (req, res) => {
  if (req.url.includes('favicon')) {
    res.sendStatus(200);
  } else if (req.url.indexOf('qa') < 0) {
    try {
      console.log(process.env.API_KEY )
      const response = await axios.get(`${baseURL}${req.url}`, {
        headers: { Authorization: process.env.API_KEY },
      });
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: 'Error', err });
    }
  }
});


app.put('/qa/questions/*/helpful', QA.questionHelpful);
app.put('/qa/questions/*/report', QA.questionReport);
app.put('/qa/answers/*/helpful', QA.answerHelpful);
app.put('/qa/answers/*/report', QA.answerReport);
app.put('/*', async (req, res) => {
  if (req.url.indexOf('qa') < 0) {
    const data = req.body;
    try {
      const response = await axios.put(`${baseURL}${req.url}`, { data }, {
        headers: { Authorization: process.env.API_KEY },
      });
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: 'Error', err });
    }
  }
});

app.post('/qa/questions', QA.addQuestion);
app.post('/qa/questions/*/answers', QA.addAnswer);
app.post('/*', async (req, res) => {
  if (req.url.indexOf('qa') < 0) {
    const data = req.body;
    try {
      await axios.post(`${baseURL}${req.url}`, data, {
        headers: { Authorization: process.env.API_KEY },
      });
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error', err });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
