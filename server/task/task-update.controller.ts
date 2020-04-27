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
      const { completed } = req.body;

      if (completed == undefined) {
        next(
          new BaseError(
            {
              code: '401',
              message: 'completed value was not provided in the request.',
            },
            HTTP_STATUS_CODE.BAD_REQUEST
          )
        );

        return;
      }

      const updatedTask = await updateTask(parseInt(taskId), completed);

      res.status(200).json(updatedTask);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
