import express from 'express';

import BaseError from './error.base';

export default (
  err: any,
  req: express.RequestHandler,
  res: express.Response,
  next: express.NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode, ...restError } =
    err instanceof BaseError ? err : new BaseError();

  res.status(statusCode).json({ ...restError });
};
