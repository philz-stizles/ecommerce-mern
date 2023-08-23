import { Request, Response, NextFunction } from 'express';
import HttpException from '../common/http.exception';

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.statusCode || error.status || 500;

  console.error('ERROR HANDLER', status, error);

  res.status(status).json({});
};

export default errorHandler;
