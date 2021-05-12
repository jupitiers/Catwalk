// const request = require('supertest');
// const express = require('express');
// const app = express();
// const path = require('path');

// const QA = require('./QA/queries.js');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// describe('QA API', () => {
//   test('Should get questions and related data from /qa/questions'), async function (done) => {
//     request(app)
//       .get('/qa/questions\?', QA.getQuestions);
//       .query({product_id: 1})
//       .expect(200)
//       .end(function (err, res) {
//         if (err) {
//           return done(err);
//         }
//         return done();
//       })
//   }
// })