const {Client} = require('pg');

const connection = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'qa',
  port: 5432
});

connection.connect;

const getInfo = (req, res) => {
  res.send('This is where the queries would take place');
};

module.exports = {
  getInfo
}