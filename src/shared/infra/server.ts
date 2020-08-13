import 'reflect-metadata';
import 'dotenv/config';
import '@config/index';
import express from 'express';
import routes from './routes';

import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', async (request, response) => {
  response.json({ message: 'Hello Delivery Much' });
});

app.listen(3333, () => {
  console.log('Server running on port 3333'); // eslint-disable-line no-console
});
