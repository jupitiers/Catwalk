const express = require('express');
const router = express.Router();
const cassandraClient = require('../database/index.js');

// Get reviews based off of product id
router.get('/', async (req, res) => {
  try {
    const { product_id } = req.query;
    const page = req.query.page || 1;
    const count = req.query.count || 5 ;
    const getReviewsByProductIdQuery = 'select * from reviews.review_items where product_id = ? limit ?';
    const reviews = await cassandraClient.execute(getReviewsByProductIdQuery, [product_id, count], { prepare: true });
    // filter our reported
    const filteredReviews = reviews.rows.filter(review => review.reported !== true);
    const results = {};
    results.product;
    results.page = page;
    results.count = count;
    results.results = filteredReviews;
    res.status(200).json({ ...results });
    // create a readable stream for reviews
  } catch (err) {
    console.log(err)
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
    const getRecommends = await cassandraClient.execute('select recommend from reviews.reviews where product_id = ?', [product_id], { prepare: true });
    const recommend = { 'true': 0, 'false': 0 };
    // Iterate thru all the ratings and increment
    for (let obj of getRecommends.rows) {
      if (recommend.hasOwnProperty(obj.recommend)) {
        recommend[obj.recommend] += 1;
      }
    }
    characteristicObj['recommend'] = recommend;

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
          let lenOfChar = value.rows.length;
          for (let row of value.rows) {
            // Find the average for characteristic
            sum += row.value / lenOfChar;
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

        res.status(200).json({ ...characteristicObj });
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
      id, product_id, rating,
      summary, body, recommend, reported, reviewer_name,
      reviewer_email, response, helpfulness, photos, characteristics
    } = req.body;
    const date = new Date();
    // create a user defined type for each photo in photos
    for (let i = 0; i < photos.length; i++) {
      const photoUDT = {
        id: Math.random() * 1000,
        url: photos[i]
      };
      // assign each element a UDT photo object
      photos[i] = photoUDT;
    }
    // get maximum counter from reviews counter table
    const getReviewsCounter = await cassandraClient.execute('select * from reviews.reviews_counter');
    const nextGetReviewsCounter = getReviewsCounter.rows[0].counter + 1;
    // update the counter table for review
    await cassandraClient.execute('update reviews.reviews_counter set counter = ? where id = ?', [nextGetReviewsCounter, 1], { prepare: true });
    // insert into reviews table new review
    const insertIntoRows = 'INSERT INTO reviews.reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness, photos ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    // execute the cassandra drive to save new product
    cassandraClient.execute(insertIntoRows, [
      nextGetReviewsCounter, product_id, rating, date, summary, body, recommend, reported, reviewer_name,
      reviewer_email, response, helpfulness, photos
    ], { prepare: true });
    // update products and reviews join table row with the newest counter for product
    await cassandraClient.execute('insert into reviews.reviews_products (review_id, product_id) values (? , ?)', [nextGetReviewsCounter, product_id], { prepare: true });

    // // update characteristic
    const keys = Object.keys(characteristics);
    const randCharId = Math.random() * 1000;
    // iterate for each characteristic inside object
    for (let charId of keys) {
      // add to the reviews characteristic table
      await cassandraClient.execute('insert into reviews.characteristics_reviews (id, characteristic_id, review_id, value) values (? , ?, ?, ?)',
      [randCharId.toFixed(2), charId, nextGetReviewsCounter, characteristics[charId]], { prepare: true });
    }

    res.status(201).json({ success: true, message: 'Successfully added review.' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Failed adding a review.', err: err });
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

