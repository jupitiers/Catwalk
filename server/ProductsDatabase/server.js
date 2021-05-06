const express = require('express');
const axios = require('axios');

const app = express();
const path = require('path');

const PORT = 5432;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/dist/')));

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
