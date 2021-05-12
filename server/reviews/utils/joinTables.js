const cassandraClient = require('../database/index.js');

const getAllReviews = 'select * from reviews.review_items';
const getAllReviewsPhotos = 'select * from reviews.review_photos where review_id = ?';
// Combine csv files with reviews and photos
  // create a cassandra stream - iterate through each row in reviews
  cassandraClient.eachRow(getAllReviews, [], { prepare: true, fetchSize: 100, autoPage: true }, async function (n, reviewsRow) {
    try {
      const getPhotosByReviewId = 'select * from reviews.review_photos where review_id = ?';
      const photosRow = await cassandraClient.execute(getPhotosByReviewId, [reviewsRow.id], { prepare: true });
      // get the photos
      const photos = photosRow.rows;
      // insert into the reviews.reviews table
      const insertQuery = 'INSERT INTO reviews.reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness, photos ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      // Populate the main reviews table
      await cassandraClient.execute(insertQuery, [
        reviewsRow.id,
        reviewsRow.product_id,
        reviewsRow.rating,
        reviewsRow.date,
        reviewsRow.summary,
        reviewsRow.body,
        reviewsRow.recommend,
        reviewsRow.reported,
        reviewsRow.reviewer_name,
        reviewsRow.reviewer_email,
        reviewsRow.response,
        reviewsRow.helpfulness,
        photos
      ], { prepare: true });
      console.log(n,' at n')
      // combine the reviews and products id together (review_id, product_id)
      await cassandraClient.execute('insert into reviews.reviews_products (review_id, product_id) values (? , ?)', [reviewsRow.id, reviewsRow.product_id], { prepare: true });
    } catch (err) {
      console.log(err)
    }
  }); // end of stream with cassandra client
