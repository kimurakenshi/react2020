import express from 'express';

import BaseError from '../error/error.base';
import { getTasks } from '../db';

const router = express.Router();

router.post(
  '',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const taskList = getTasks();

      res.status(200).json(taskList);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
