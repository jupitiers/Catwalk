import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 100 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
};

export default function main() {
  let response, response2, response3, response4, response5;
  const newReview = {   "product_id": 2,
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
  "summary": "I am liking these glasses",
  "characteristics": {
      "1": 3
  }
};
  // get products
  response = http.get("http://localhost:8080/reviews/?product_id=2");
  // get meta data for product
  response2 = http.get("http://localhost:8080/reviews/meta/?product_id=2");
  // add a new review for product
  // response3 = http.post("http://localhost:8080/reviews/", JSON.stringify(newReview),{
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // // mark a review as helpful
  // response4 = http.put("http://localhost:3000/reviews/5777922/helpful");
  // // report a review
  // response5 = http.put("http://localhost:3000/reviews/5777922/report");

  // console.log(JSON.stringify(response3))

  // Automatically added sleep
  sleep(1);
}
