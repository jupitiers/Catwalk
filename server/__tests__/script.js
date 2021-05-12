import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = {
  stages: [
    {duration: "1m", target: 500},
    // {duration: "1m", target: 500},
    // {duration: "1m", target: 1000}
  ]
}


export default function () {
  var getQuestions = http.get('http://localhost:3000/qa/questions?product_id=1');

  sleep(1);
};