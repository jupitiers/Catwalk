const cassandraClient = require('./database/index.js');
const uuid = require('uuid');

async function reviewsServices() {
  try {
    // connect to Cassandra DB
    await cassandraClient.connect(() => {
      console.log('Database with Cassandra is connected...');
    });
    // create a User Defined Type
    const photosUDT = `
    CREATE TYPE reviews.photos(
      id int,
      url text
    );
    `;
    // crate schema for reviews
    const cqlCreateReviewItems = `
    CREATE TABLE IF NOT EXISTS reviews.review_items (
      id int,
      product_id int,
      rating int,
      date timestamp,
      summary text,
      body text,
      recommended boolean,
      reported boolean,
      reviewer_name text,
      reviewer_email text,
      response text,
      helpfulness int,
      PRIMARY KEY (product_id, id)
    );`;

    // crate schema for reviews
    const cqlCreateReviews = `
    CREATE TABLE IF NOT EXISTS reviews.reviews (
      id int,
      product_id int,
      rating int,
      date timestamp,
      summary text,
      body text,
      recommended boolean,
      reported boolean,
      reviewer_name text,
      reviewer_email text,
      response text,
      helpfulness int,
      photos list<frozen<photos>>,
      PRIMARY KEY (product_id, id)
    );`;

    // create schema for characteristic
    const cqlCreateCharacteristics = `
    CREATE TABLE IF NOT EXISTS reviews.characteristics (
      id int,
      product_id int,
      name text,
      PRIMARY KEY (product_id, name, id)
    );`;

    // create schema for characteristic
    const cqlCreateCharacteristicReviews = `
    CREATE TABLE IF NOT EXISTS reviews.characteristics_reviews (
      id int,
      characteristic_id int,
      review_id int,
      value int,
      PRIMARY KEY (characteristic_id, review_id)
    );`;

    const cqlCreateReviewPhotos = `
    CREATE TABLE IF NOT EXISTS reviews.review_photos (
      id int,
      review_id int,
      url text,
      PRIMARY KEY (review_id, id)
    );`;


    async function createTables() {
      await cassandraClient.execute(cqlCreateReviews, []);
      await cassandraClient.execute(cqlCreateReviewItems, []);
      await cassandraClient.execute(cqlCreateCharacteristics, []);
      await cassandraClient.execute(cqlCreateCharacteristicReviews, []);
      await cassandraClient.execute(cqlCreateReviewPhotos, []);
    }
    createTables();



    const getAllReviews = 'select * from reviews.review_items';
    const getAllReviewsPhotos = 'select * from reviews.review_photos where review_id = ?';
    // Combine csv files with reviews and photos
    function joinReviewsWithPhotos() {
      // create a cassandra stream - iterate through each row in reviews
      cassandraClient.eachRow(getAllReviews, [], { prepare: true, fetchSize: 1000, autoPage: true }, async function (n, reviewsRow) {
        try {
          const getPhotosByReviewId = 'select * from reviews.review_photos where review_id = ?';
          const photosRow = await cassandraClient.execute(getPhotosByReviewId, [reviewsRow.id], { prepare: true });
          // get the photos
          const photos = photosRow.rows;
          // insert into the reviews.reviews table
          const insertQuery = 'INSERT INTO reviews.reviews (id, product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness, photos ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          // Populate the main reviews table
          await cassandraClient.execute(insertQuery, [
            reviewsRow.id,
            reviewsRow.product_id,
            reviewsRow.rating,
            reviewsRow.date,
            reviewsRow.summary,
            reviewsRow.body,
            reviewsRow.recommended,
            reviewsRow.reported,
            reviewsRow.reviewer_name,
            reviewsRow.reviewer_email,
            reviewsRow.response,
            reviewsRow.helpfulness,
            photos
          ], { prepare: true });
        } catch (err) {
          console.log(err)
        }
      }); // end of stream with cassandra client
    } // end of join reviews with photos

    const getReviewsOfProduct = 'select * from reviews.reviews where product_id = 17067';
    cassandraClient.eachRow(getReviewsOfProduct, [], { prepare: true }, async function(n, review) {
      const getCharacteristicReview = 'select * from reviews.characteristics where review_id = ?';
      await cassandraClient.eachRow(getCharacteristicReview, [review.id], { prepare: true }, async function(n, characteristicReview) {
        try {
          // const characteristic = await cassandraClient.execute('select * from reviews.characteristics where product_id = ? and characteristic_id = ?',[review.product_id, characteristicReview.characteristic_id], {prepare: true});
          console.log(characteristicReview, review.product_id)
        } catch(err) {
          console.log(err)
        }
      });
      console.log('done')
    });
  } catch (err) {
    console.log(err)
    console.log('Something failed with the database.')
  }
}

module.exports = reviewsServices;