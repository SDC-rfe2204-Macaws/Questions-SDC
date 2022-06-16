import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '15s'
}

const baseUrl = 'http://localhost:3000/qa/questions'

const generateRandomProductId = () => Math.floor(Math.random() * 10000)
//http://localhost:3000/qa/questions?product_id=37312&page=1&count=500

export default function () {
  const url = `${baseUrl}?product_id=${generateRandomProductId()}&page=1&count=500`
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200' : r => r.status === 200,
    'transaction time < 200ms' : r => r.status === 200,
    'transaction time < 500ms' : r => r.status === 500,
    'transaction time < 1000ms' : r => r.status === 1000,
    'transaction time < 2000ms' : r => r.status === 2000,
  });

}