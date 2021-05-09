const request = require('supertest');
const express = require('express');
const app = express();
const reviewsRouter = require('../routes/reviews.route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reviews', reviewsRouter);

const newReview = {
  "product_id": 2,
  "body": "They are very dark.  But that's good because I'm in very sunny spots",
  "date": "2019-06-22T16:00:00.000Z",
  "helpfulness": 5,
  "photos": [],
  "rating": 4,
  "recommended": true,
  "reported": false,
  "response": "Glad you're enjoying the product!",
  "reviewer_email": "first.last@gmail.com",
  "reviewer_name": "bigbrotherbenjamin",
  "summary": "I am liking these glasses"
};
// Test reviews services
describe('Reviews Services', function () {
  // GET /reviews/?product_id=2
  it('should respond with reviews for product', function (done) {
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
  it('should respond with meta data for product', function (done) {
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

  // POST /reviews
  it('should POST a new review', function (done) {
    request(app)
      .post('/reviews/')
      .send( newReview )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        return done();
      })
  });

  // PUT /reviews/helpful (review id = 5777930)
  it('should respond with marking as a review helpful', function (done) {
    const review_id = 5777922;
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
  it('should respond with with reporting a review', function (done) {
    const review_id = 5777922;
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


