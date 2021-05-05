const {Client, Pool} = require('pg');
const {Sequelize, DataTypes} = require('sequelize');

const connection = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'qa',
  port: 5432
});

const sequelize = new Sequelize('qa', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

const questions = sequelize.define('questions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER
  },
  body: {
    type: DataTypes.TEXT
  },
  date_written: {
    type: DataTypes.STRING
  },
  asker_name: {
    type: DataTypes.STRING
  },
  asker_email: {
    type: DataTypes.STRING
  },
  reported: {
    type: DataTypes.BOOLEAN
  },
  helpful: {
    type: DataTypes.INTEGER
  }
})

connection.connect;
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const getInfo = (req, res) => {
  connection.query('SELECT * FROM questions', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  })
};

module.exports = {
  getInfo
}