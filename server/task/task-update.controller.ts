import express from 'express';

import BaseError from '../error/error.base';
import { updateTask } from '../db';

const router = express.Router({ mergeParams: true });

router.put(
  '',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { taskId } = req.params;
      const updatedTask = updateTask(taskId, req.body);

      res.status(200).json(updatedTask);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
