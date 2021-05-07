const {Client, Pool} = require('pg');
const {Sequelize, DataTypes} = require('sequelize');

const connection = new Pool({
  user: 'daniel',
  password: 'postgres',
  host: 'localhost',
  database: 'qa',
  port: 5432
});

connection.connect;


const getQuestions = (request, response) => {
  const query = request.url.substring(request.url.indexOf('?'));
  const urlParams = new URLSearchParams(query);
  const productId = urlParams.get('product_id');

  var questionQuery =
  `select
    json_agg(
            json_build_object(
                'question_id', q.id,
                'question_body', q.body,
                'question_date', q.date_written,
                'asker_name', q.asker_name,
                'question_helpfulness', q.helpful,
                'reported', q.reported,
                'answers', answers

        )
    ) results
    from questions q
    left join (
        select
            "questionId",
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
                  "answerId",
                  json_agg(
                      json_build_object(
                          'id', p.id,
                          'url', p.url
                      )
                  ) photos
              from "answerImages" p
              group by 1
          ) p on a.id = p."answerId"
      group by "questionId"
  ) a on q.id = a."questionId" WHERE q.product_id='` + productId + `'`;

  // var questionQuery = `SELECT *, (SELECT * FROM answers WHERE answers."questionId" = questions.id) AS answers FROM questions WHERE questions.product_id=${productId}`;

  var data;
  connection.query(questionQuery, (error, results) => {
    if (error) {
      throw error;
    }
    data = results.rows[0];
    results.rows.forEach(entry => {
      //getAnswer(entry.id)
      //Use entry id on getAnswers to get related answers
    })

    response.status(200).json(data);
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
    response.status(200).json(results.rows[0].results);
  })
};

//Need post requests

const questionHelpful = (request, response) => {
  connection.query("SELECT helpful FROM questions WHERE id='1'")
    .then(helpful => {
      var count = parseInt(helpful.rows[0].helpful);
      count++;
      connection.query("UPDATE questions SET helpful='" + count + "' WHERE id='1'")
        .then(() => {
          response.send('Question Helpfulness Updated');
        })
    });
}

const answerHelpful = (request, response) => {
  connection.query("SELECT helpful FROM answers WHERE id='1'")
    .then(helpful => {
      var count = parseInt(helpful.rows[0].helpful);
      count++;
      connection.query("UPDATE answers SET helpful='" + count + "' WHERE id='1'")
        .then(() => {
          response.send('Answer Helpfulness Updated');
        })
    });
}

const questionReport = (request, response) => {
  connection.query("SELECT reported FROM questions WHERE id='1'")
  .then(reported => {
    var reported = reported.rows[0].reported;
    var updatedReport = !reported;
    connection.query("UPDATE questions SET reported='" + updatedReport + "' WHERE id='1'")
      .then(() => {
        response.send('Question Reported');
      })
  });
}

const answerReport = (request, response) => {
  connection.query("SELECT reported FROM answers WHERE id='1'")
  .then(reported => {
    var reported = reported.rows[0].reported;
    var updatedReport = !reported;
    connection.query("UPDATE answers SET reported='" + updatedReport + "' WHERE id='1'")
      .then(() => {
        response.send('Answer Reported');
      })
  });
}

module.exports = {
  getQuestions,
  getAnswers,
  questionHelpful,
  answerHelpful,
  questionReport,
  answerReport
}