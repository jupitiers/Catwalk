const request = require('supertest');
const express = require('express');
const app = express();
const reviewsRouter = require('../routes/reviews.route.js');

app.use('/reviews', reviewsRouter);

// Test reviews services
describe('Reviews Services', function () {
  // GET /reviews/?product_id=2
  it('respond with reviews for product', function (done) {
    request(app)
      .get('/reviews/')
      .query({ product_id: 2 })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        return done();
      })
  });
  // GET /reviews/meta/?product_id=2
  it('respond with meta data for product', function (done) {
    request(app)
      .get('/reviews')
      .query({ product_id: 2 })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        return done();
      })
  });
  // POST /reviews/?product_id=2
  it('respond with meta data for product', function (done) {
    request(app)
      .post('/reviews/')
      .send({ product_id: 2 })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        return done();
      })
  });
  // PUT /reviews/helpful (review id = 5777930)
  it('respond with marking as a review helpful', function (done) {
    const review_id = 5777931;
    request(app)
      .put(`/reviews/${review_id}/helpful`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        return done();
      })
  });
  // PUT /reviews/reported (review id = 5777931)
  it('respond with with reporting a review', function (done) {
    const review_id = 5777931;
    request(app)
      .put(`/reviews/${review_id}/report`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

});


