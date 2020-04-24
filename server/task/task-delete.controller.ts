import express from 'express';

import BaseError from '../error/error.base';
import { deleteTask } from '../db';

const router = express.Router({ mergeParams: true });

router.delete(
  '',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { taskId } = req.params;

      const deletedTask = deleteTask(taskId);

      res.status(200).json(deletedTask);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
