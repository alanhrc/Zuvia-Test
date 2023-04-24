import "reflect-metadata"
import 'express-async-errors';
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger/swagger.json'

import './shared/container';
import { router } from './routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };
