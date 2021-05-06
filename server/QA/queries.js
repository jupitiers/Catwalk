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

  var questionQuery =
  `select
    json_build_object(
        'results', json_agg(
            json_build_object(
                'question_id', q.id,
                'question_body', q.body,
                'question_date', q.date_written,
                'asker_name', q.asker_name,
                'question_helpfulness', q.helpful,
                'reported', q.reported,
                'answers', answers
            )
        )
    ) results
    from questions q
    left join (
        select
            question_id,
            json_agg(
                json_build_object(
                    'id', a.id,
                    'body', a.body,
                    'date', a.date_written,
                    'answerer_name', a.answerer_name,
                    'helpfulness', a.helpful,
                    'photos', photos
                    )
                ) answers
      from
          answers a
          left join (
              select
                  answer_id,
                  json_agg(
                      json_build_object(
                          'id', p.id,
                          'url', p.url
                      )
                  ) photos
              from answerImages p
              group by 1
          ) p on a.id = p.answer_id
      group by question_id
  ) a on q.id = a.question_id WHERE q.product_id='` + productId + `'`;


  connection.query(questionQuery, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows[0].results.results);
    results.rows[0].results.results.forEach(entry => {
      if (entry.reported === '1') {
        entry.reported = true;
      } else if (entry.reported === '0') {
        entry.reported = false;
      }
    })
    response.status(200).json(results.rows[0].results);
  })
};

const getAnswers = (request, response) => {
  var questionId = request.url.substring(14, request.url.indexOf('/answers'));

  var answerQuery =
  `select
    json_build_object(
        'results', json_agg(
              json_build_object(
                  'answer_id', a.id,
                  'body', a.body,
                  'date', a.date_written,
                  'answerer_name', a.answerer_name,
                  'helpfulness', a.helpful,
                  'photos', photos
              )
          )
      ) results
      from
      answers a
      left join (
          select
              answer_id,
              json_agg(
                  json_build_object(
                      'id', p.id,
                      'url', p.url
                  )
              ) photos
          from answerImages p
          group by 1
      ) p on a.id = p.answer_id WHERE a.question_id='` + questionId + `'`

  connection.query(answerQuery, (error, results) => {
    if (error) {
      throw error;
    }
    // results.rows.forEach(entry => {
    //   if (entry.reported === '1') {
    //     entry.reported = true;
    //   } else if (entry.reported === '0') {
    //     entry.reported = false;
    //   }
    // })
    response.status(200).json(results.rows[0].results);
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