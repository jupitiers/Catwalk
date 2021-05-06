const {Client, Pool} = require('pg');
const {Sequelize, DataTypes} = require('sequelize');

const connection = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'qa',
  port: 5432
});

// const sequelize = new Sequelize('qa', 'postgres', 'postgres', {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// const questions = sequelize.define('questions', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true
//   },
//   product_id: {
//     type: DataTypes.INTEGER
//   },
//   body: {
//     type: DataTypes.TEXT
//   },
//   date_written: {
//     type: DataTypes.STRING
//   },
//   asker_name: {
//     type: DataTypes.STRING
//   },
//   asker_email: {
//     type: DataTypes.STRING
//   },
//   reported: {
//     type: DataTypes.BOOLEAN
//   },
//   helpful: {
//     type: DataTypes.INTEGER
//   }
// })

connection.connect;
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const getQuestions = (request, response) => {
  const query = request.url.substring(request.url.indexOf('?'));
  const urlParams = new URLSearchParams(query);
  const productId = urlParams.get('product_id');

  connection.query("SELECT * FROM questions WHERE product_id='" + productId + "'", (error, results) => {
    if (error) {
      throw error;
    }
    results.rows.forEach(entry => {
      if (entry.reported === '1') {
        entry.reported = true;
      } else if (entry.reported === '0') {
        entry.reported = false;
      }
    })
    response.status(200).json(results.rows);
  })
};

const getAnswers = (request, response) => {
  connection.query("SELECT * FROM answers WHERE question_id='1'", (error, results) => {
    if (error) {
      throw error;
    }
    results.rows.forEach(entry => {
      if (entry.reported === '1') {
        entry.reported = true;
      } else if (entry.reported === '0') {
        entry.reported = false;
      }
    })
    response.status(200).json(results.rows);
  })
};

const getImages = (request, response) => {
  connection.query("SELECT * FROM answerimages WHERE answer_id='5'", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

module.exports = {
  getQuestions,
  getAnswers,
  getImages
}