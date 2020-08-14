import 'reflect-metadata';
import 'dotenv/config';
import '@config/index';
import express, { Request, Response } from 'express';
import routes from './routes';
import AppError from '../errors/AppError';

import '@shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', async (request, response) => {
  response.json({ message: 'Hello Delivery Much' });
});

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(503).json({
    status: 'error',
    message: 'External server error',
  });
});

app.listen(3333, () => {
  console.log('Server running on port 3333'); // eslint-disable-line no-console
});
