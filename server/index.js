const express = require('express');
require('dotenv').config();
const axios = require('axios');

const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
app.get('/*', async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}${req.url}`, {
      headers: { Authorization: process.env.API_KEY },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.put('/*', async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.put(`${baseURL}${req.url}`, { data }, {
      headers: { Authorization: process.env.API_KEY },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.post('/*', async (req, res) => {
  const data = req.body;
  try {
    await axios.post(`${baseURL}${req.url}`, data, {
      headers: { Authorization: process.env.API_KEY },
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
