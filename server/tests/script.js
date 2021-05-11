import http from 'k6/http';
import { sleep, group } from 'k6';

// export let options = {
//   vus: 10,
//   duration: '30s'
// };

export default function () {

  group('Get questions by product ID', function() {
    http.get('http://localhost:3000/qa/questions?product_id=1');
    sleep(1);
  });

  group('Get answers by question ID', function() {
    http.get('http://localhost:3000/qa/questions/1/answers');
    sleep(1);
  })
};