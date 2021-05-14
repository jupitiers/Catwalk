import http from 'k6/http';
import { sleep, group } from 'k6';

export const options = {
  // stages: [
    // {duration: "1m", target: 100},
    // {duration: "1m", target: 500},
    // {duration: "1m", target: 700}
    // {duration: "1m", target: 500},
    // {duration: "1m", target: 1000}
  // ],
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
    },
  }
}


export default function () {
  var getQuestions = http.get('http://localhost:3000/qa/questions?product_id=1');

  sleep(1);
};