import express from 'express';

import BaseError from '../error/error.base';
import { createTask } from '../db';

const router = express.Router({ mergeParams: true });

router.post(
  '',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { name } = req.body;

      const newTask = await createTask(name);

      res.status(200).json(newTask);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
