import express from 'express';

import BaseError from '../error/error.base';
import { updateTask } from '../db';
import { HTTP_STATUS_CODE } from '../core';

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
      const { isCompleted } = req.body;

      if (isCompleted == undefined) {
        next(
          new BaseError(
            {
              code: '401',
              message: 'isCompleted value was not provided in the request.',
            },
            HTTP_STATUS_CODE.BAD_REQUEST
          )
        );

        return;
      }

      const updatedTask = updateTask(taskId, isCompleted);

      res.status(200).json(updatedTask);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
