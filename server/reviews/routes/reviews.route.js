const express = require('express');
const router = express.Router();
const cassandraClient = require('../database/index.js');

// Get reviews based off of product id
router.get('/', async (req, res) => {
  try {
    const { product_id } = req.query;
    const getReviewsByProductIdQuery = 'select * from reviews.reviews where product_id = ?';
    const reviews = await cassandraClient.execute(getReviewsByProductIdQuery, [product_id], { prepare: true });
    res.status(200).json({ success: true, reviews: reviews.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed getting reviews...' });
  }
});

// Router for getting all meta-data reviews for particular product
router.get('/meta/', async (req, res) => {
  const { product_id } = req.query;
  try {
    const characteristicObj = { product_id: product_id };
    // Calculate all of the ratings
    const getRatings = await cassandraClient.execute('select rating from reviews.reviews where product_id = ?', [product_id], { prepare: true });
    const ratings = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
    // Iterate thru all the ratings and increment
    for (let obj of getRatings.rows) {
      if (ratings.hasOwnProperty(obj.rating)) {
        ratings[obj.rating] += 1;
      }
    }
    characteristicObj['ratings'] = ratings;

    // Calculate all of the recommended from reviews
    const getRecommends = await cassandraClient.execute('select recommended from reviews.reviews where product_id = ?', [product_id], { prepare: true });
    const recommend = { 'true': 0, 'false': 0 };
    // Iterate thru all the ratings and increment
    for (let obj of getRecommends.rows) {
      if (recommend.hasOwnProperty(obj.recommended)) {
        recommend[obj.recommended] += 1;
      }
    }
    characteristicObj['recommended'] = recommend;

    const characteristcQuery = 'select * from reviews.characteristics where product_id = ?';
    let characteristicArr = [];
    // Create a read strean for Cassandra's queries
    await cassandraClient.stream(characteristcQuery, [product_id], { prepare: true })
      .on('readable', function () {
        // 'readable' is emitted as soon a row is received and parsed
        var row;
        while (row = this.read()) {
          // push each characteristic to row
          characteristicArr.push(row);
        }
      })
      .on('end', async function () {
        // Stream ended, there aren't any more rows
        const characteristicMeta = [];
        for (let characteristic of characteristicArr) {
          // intialize the characteristic object by each type
          const obj = {
            [characteristic.name]: true
          };
          const value = await cassandraClient.execute('select * from reviews.characteristics_reviews where characteristic_id = ?', [characteristic.id], { prepare: true });
          let sum = 0;
          for (let row of value.rows) {
            sum += row.value;
          }
          // check to see if the characteristic exists
          if (obj.hasOwnProperty(characteristic.name)) {
            obj['value'] = sum;
            obj['name'] = characteristic.name;
            obj['id'] = characteristic.id;
          }
          characteristicMeta.push(obj);
        }

        characteristicObj['characteristics'] = {};
        for (let characteristic of characteristicMeta) {
          characteristicObj['characteristics'][characteristic.name] = {
            id: characteristic.id,
            value: characteristic.value
          }
        }

        res.status(200).json({ success: true, meta: characteristicObj });
      })
      .on('error', function (err) {
        // Something went wrong: err is a response error from Cassandra
        console.log('Streaming failed with Cassandra', err);
      });

  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: `Failed getting meta-data for product id ${product_id}` });
  }
});

// Add a review
router.post('/', async (req, res) => {
  try {
    const {
      id, product_id, rating, date,
      summary, body, recommend, reported, reviewer_name,
      reviewer_email, response, helpfulness, photos
    } = req.body;
    // get maximum counter from reviews counter table
    const getMaxCounter = await cassandraClient.execute('select MAX(id) from reviews.reviews_counter');
    const uniqueId = getMaxCounter.rows[0]['system.max(id)'];
    // insert into reviews table new review
    const insertIntoRows = 'INSERT INTO reviews.reviews (id, product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness, photos ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    // execute the cassandra drive
    cassandraClient.execute(insertIntoRows, [
      uniqueId + 1, product_id, rating, date, summary, body, recommend, reported, reviewer_name,
      reviewer_email, response, helpfulness, photos
    ], { prepare: true });
    // increment reviews counter
    cassandraClient.execute('insert into reviews.reviews_counter (id) values (?) ', [uniqueId + 1], { prepare: true });
    res.status(201).json({ success: true, message: 'Successfully added review.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed adding a review.' });
  }
});

// Mark a review as helpful
router.put('/:review_id/helpful', async (req, res) => {
  const { review_id } = req.params;
  try {
    // get join table of reviews and products
    const reviewProductsRow = await cassandraClient.execute('select * from reviews.reviews_products where review_id = ?', [review_id], { prepare: true });
    // get the review by review id
    const review = await cassandraClient.execute('select * from reviews.reviews where product_id = ? and id = ?', [reviewProductsRow.rows[0].product_id, reviewProductsRow.rows[0].review_id], { prepare: true });
    // increment review's helpfulness
    const newReviewHelpfulness = review.rows[0].helpfulness + 1;
    // update review's helpfulness
    await cassandraClient.execute('update reviews.reviews set helpfulness = ? where product_id = ? and id = ?', [newReviewHelpfulness, reviewProductsRow.rows[0].product_id, review.rows[0].id], { prepare: true });
    res.status(200).json({ success: true, message: 'Successfully marked review helpful.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed marking a review helpful .' });
  }
});

// Report a review
router.put('/:review_id/report', async (req, res) => {
  const { review_id } = req.params;
  try {
    // get join table of reviews and products
    const reviewProductsRow = await cassandraClient.execute('select * from reviews.reviews_products where review_id = ?', [review_id], { prepare: true });
    // get the review by review id
    const review = await cassandraClient.execute('select * from reviews.reviews where product_id = ? and id = ?', [reviewProductsRow.rows[0].product_id, reviewProductsRow.rows[0].review_id], { prepare: true });
    // update review's reported to true
    await cassandraClient.execute('update reviews.reviews set reported = ? where product_id = ? and id = ?', [true, reviewProductsRow.rows[0].product_id, review.rows[0].id], { prepare: true });
    res.status(200).json({ success: true, message: 'Successfully reported review.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed reporting a review helpful .' });
  }
});

module.exports = router;
