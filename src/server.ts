import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ message: 'Hello Delivery Much' });
});

app.listen(3333, () => {
  console.log('Server running on port 3333'); // eslint-disable-line no-console
});
