import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { router } from '@routes/routes';
import { AppError } from '@errors/AppError';
import helmet from 'helmet';

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);
const PORT = Number(process.env.SERVER_PORT) || 80;

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  return response.status(500).json({
    status: 'Error',
    message: `Internal Server Error ${err.message}`
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`);
});
