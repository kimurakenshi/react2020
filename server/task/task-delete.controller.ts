import express from 'express';

import BaseError from '../error/error.base';
import { deleteTask } from '../db';
import { HTTP_STATUS_CODE } from '../core';

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

      if (!taskId) {
        next(
          new BaseError(
            {
              code: '401',
              message: 'taskId is not defined',
            },
            HTTP_STATUS_CODE.BAD_REQUEST
          )
        );

        return;
      }

      const deletedTask = await deleteTask(parseInt(taskId));

      res.status(200).json(deletedTask);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
