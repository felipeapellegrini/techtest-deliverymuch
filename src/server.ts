import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

// const RECIPEPUPPY_API = 'http://www.recipepuppy.com/about/api/';
const GIPHY_API = 'http://api.giphy.com/v1/gifs/search';
const { GIPHY_API_KEY } = process.env;

app.get('/', (request, response) => {
  response.json({ message: 'Hello Delivery Much' });
});

app.get('/giphy/', (request, response) => {
  const query = String(request.query.q);
  getGif(query)
    .then(results => {
      response.send(results.data.data[0].images.original.url);
    })
    .catch(error => {
      response.send({
        status: error.response.status,
        message: error.message,
      });
    });
});

function getGif(query: string) {
  return axios.get(GIPHY_API, {
    params: {
      api_key: GIPHY_API_KEY,
      limit: 1,
      q: query,
    },
  });
}

app.listen(3333, () => {
  console.log('Server running on port 3333'); // eslint-disable-line no-console
});
