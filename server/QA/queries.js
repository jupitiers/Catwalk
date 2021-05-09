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
/********************************************************************************************************/
/*****************************************GET REQUESTS***************************************************/
const getQuestions = (request, response) => {
  console.log('Getting Questions');
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
  ) a on q.id = a."questionId" WHERE q.product_id=${productId}`;

  // var questionQuery = `SELECT * FROM questions WHERE product_id=${productId}`;

  var data;
  connection.query(questionQuery, (error, results) => {
    if (error) {
      throw error;
    }
    data = results.rows[0];
    // data = results.rows;
    // data.forEach(async entry => {
    //   var answerQuery = `SELECT id, body, date_written, answerer_name, reported, helpful FROM answers WHERE "questionId" = ${entry.id}`
    //   await connection.query(answerQuery, (error, results) => {
    //     if (error) {
    //       throw error;
    //     }
    //     entry.answers = results.rows;
    //     // entry.answers=results.rows ? results.rows : null;
    //     // console.log(data);
    //   })
    // })
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
              "answerId",
              json_agg(
                  json_build_object(
                      'id', p.id,
                      'url', p.url
                  )
              ) photos
          from "answerImages" p
          group by 1
      ) p on a.id = p."answerId" WHERE a."questionId"=${questionId}`

  connection.query(answerQuery, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows[0].results);
  })
};


/********************************************************************************************************/
/*****************************************POST REQUESTS**************************************************/
const addQuestion = async (request, response) => {
  var data = request.body;
  data.date_written = new Date().toISOString().split('T')[0];
  data.reported = 0;
  data.helpful = 0;


  await connection.query('SELECT count FROM "questionCounters"', (error, results) => {
    if (error) {
      throw error;
    }
    var questionCount = results.rows[0].count;
    console.log(questionCount);
    questionCount++;
    console.log(questionCount);
    const addQuestionQuery = `INSERT INTO "questions" (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${questionCount}, ${data.product_id}, '${data.body}', '${data.date_written}'::DATE, '${data.name}', '${data.email}', ${data.reported}, ${data.helpful})`;
    console.log(addQuestionQuery)

    connection.query(addQuestionQuery, (error, results) => {
      if (error) {
        throw error;
      }
      var updateCountQuery = `UPDATE "questionCounters" SET count=${questionCount} WHERE id=1`;
      connection.query(updateCountQuery, (error, results) => {
        if (error) {
          throw error;
        }
      })
      response.send('Question Added');
    })

  })
}

const addAnswer = async (request, response) => {

  var questionId = request.url.substring(14, request.url.indexOf('/answers'));

  var data = request.body;
  data.date_written = new Date().toISOString().split('T')[0];
  data.reported = 0;
  data.helpful = 0;

  await connection.query('SELECT count FROM "answerCounters"', (error, results) => {
    if (error) {
      throw error;
    }
    //For addAnswerQuery id AND addPhotoQuery answerId
    var answerCount = results.rows[0].count;
    answerCount++;

    var addAnswerQuery = `INSERT INTO "answers" (id, body, date_written, answerer_name, answerer_email, reported, helpful, "questionId") VALUES (${answerCount}, '${data.body}', '${data.date_written}'::DATE, '${data.name}', '${data.email}', ${data.reported}, ${data.helpful}, ${questionId})`;

    var photos = [];
    data.photos.split(',').forEach(photo => {
      photos.push(photo);
    })


    connection.query(addAnswerQuery, (error, results) => {
      if (error) {
        throw error;
      }
      var updateCountQuery = `UPDATE "answerCounters" SET count=${answerCount} WHERE id=1`;
      connection.query(updateCountQuery, (error, results) => {
        if (error) {
          throw error;
        }
      })
      connection.query('SELECT count FROM "imageCounters"', (error, results) => {
        if (error) {
          throw error;
        }
        //For addPhotoQuery id
        var photoId = results.rows[0].count;
        photos.forEach(url => {
          photoId++;
          var addPhotoQuery = `INSERT INTO "answerImages" (id, "answerId", url) VALUES (${photoId}, ${answerCount}, '${url}')`;
          connection.query(addPhotoQuery, (error, results) => {
            if (error) {
              throw error
            }
          })
        })
      })
      response.send('Answer Added');
    })

  })
}


  /********************************************************************************************************/
  /*****************************************PUT REQUESTS***************************************************/
const questionHelpful = (request, response) => {
  var questionId = request.url.substring(14, request.url.indexOf('/helpful'));

  connection.query(`SELECT helpful FROM questions WHERE id=${questionId}`)
    .then(helpful => {
      var count = parseInt(helpful.rows[0].helpful);
      count++;
      connection.query(`UPDATE questions SET helpful=${count} WHERE id=${questionId}`)
        .then(() => {
          response.send('Question Helpfulness Updated');
        })
    });
}

const answerHelpful = (request, response) => {
  var answerId = request.url.substring(12, request.url.indexOf('/helpful'));

  connection.query(`SELECT helpful FROM answers WHERE id=${answerId}`)
    .then(helpful => {
      var count = parseInt(helpful.rows[0].helpful);
      count++;
      connection.query(`UPDATE answers SET helpful=${count} WHERE id=${answerId}`)
        .then(() => {
          response.send('Answer Helpfulness Updated');
        })
    });
}

const questionReport = (request, response) => {
  var questionId = request.url.substring(14, request.url.indexOf('/report'));

  connection.query(`SELECT reported FROM questions WHERE id=${questionId}`)
  .then(reported => {
    var reported = reported.rows[0].reported;
    var updatedReport = !reported;
    connection.query(`UPDATE questions SET reported=${updatedReport} WHERE id=${questionId}`)
      .then(() => {
        response.send('Question Reported');
      })
  });
}

const answerReport = (request, response) => {
  var answerId = request.url.substring(12, request.url.indexOf('/helpful'));

  connection.query(`SELECT reported FROM answers WHERE id=${answerId}`)
  .then(reported => {
    var reported = reported.rows[0].reported;
    var updatedReport = !reported;
    connection.query(`UPDATE answers SET reported=${updatedReport} WHERE id=${answerId}`)
      .then(() => {
        response.send('Answer Reported');
      })
  });
}

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  questionHelpful,
  answerHelpful,
  questionReport,
  answerReport
}