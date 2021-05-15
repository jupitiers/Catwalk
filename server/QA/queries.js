const {Client, Pool} = require('pg');
const {Sequelize, DataTypes} = require('sequelize');

// const connection = new Pool({
//   user: 'daniel',
//   password: 'postgres',
//   host: 'localhost',
//   database: 'qa',
//   port: 5432
// });

const connection = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: '20.84.96.176',
  database: 'qa',
  port: 5432
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to DB', err)
    return
  }
  console.log('Connection established');
});
/********************************************************************************************************/
/*****************************************GET REQUESTS***************************************************/
const getQuestions = async (request, response, calledProducts) => {
  const query = request.url.substring(request.url.indexOf('?'));
  const urlParams = new URLSearchParams(query);
  const productId = urlParams.get('product_id');

  // if (calledProducts[productId]) {
  //   response.status(200).json(calledProducts[productId]);
  // } else {
    var questionQuery = `SELECT q.id question_id, q.body question_body, q.date_written question_date, q.asker_name asker_name, q.helpful question_helpfulness, q.reported reported FROM questions q WHERE q.product_id = ${productId} AND q.reported = false`;

    var questions = await connection.query(questionQuery);
    for (var i = 0; i < questions.rows.length; i++) {
      var answerQuery = `SELECT a.id id, a.body body, a.date_written date, a.answerer_name answerer_name, a.helpful helpfulness FROM answers a WHERE a."questionId" = ${questions.rows[i].question_id} AND a.reported = false`
      var answers = await connection.query(answerQuery);
      questions.rows[i].answers = {};
      for (var j = 0; j < answers.rows.length; j++) {
        var photoQuery = `SELECT p.id id, p.url url FROM "answerImages" p WHERE p."answerId" = ${answers.rows[j].id}`;
        var photos = await connection.query(photoQuery);
        answers.rows[j].photos = photos.rows;

        var answerId = answers.rows[j].id;
        questions.rows[i].answers[answerId] = answers.rows[j];
      }
    }
    var output = {
      product_id: productId,
      results: questions.rows
    }
    calledProducts[productId] = output;
    response.status(200).json(output);
  // }


};

const getAnswers = async (request, response) => {
  var questionId = request.url.substring(14, request.url.indexOf('/answers'));

  var answerQuery = `SELECT a.id id, a.body body, a.date_written date, a.answerer_name answerer_name, a.helpful helpfulness FROM answers a WHERE a."questionId" = ${questionId} AND a.reported = false`;

  var answers = await connection.query(answerQuery);
  for (var i = 0; i < answers.rows.length; i++) {
    var photoQuery = `SELECT p.id id, p.url url FROM "answerImages" p WHERE p."answerId" = ${answers.rows[i].id}`;
    var photos = await connection.query(photoQuery);
    answers.rows[i].photos = photos.rows;
  }

  var output = {
    question: questionId,
    results: answers.rows
  };
  response.status(200).json(output);
};


/********************************************************************************************************/
/*****************************************POST REQUESTS**************************************************/
const addQuestion = async (request, response) => {
  var data = request.body;
  data.date_written = new Date().toISOString().split('T')[0];
  data.reported = false;
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
  data.reported = false;
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
    var photoData = (data.photos.indexOf(',') >= 0) ? data.photos.split(',') : data.photos;
    photoData.forEach(photo => {
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
            var updatePhotoCountQuery = `UPDATE "imageCounters" SET count=${photoId} WHERE id=1`
            connection.query(updatePhotoCountQuery, (error, results) => {
              if (error) {
                throw error
              }
            })
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
  var answerId = request.url.substring(12, request.url.indexOf('/report'));

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