import express from 'express';

import BaseError from '../error/error.base';

const router = express.Router();

router.post(
  '',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // const { searchText, recordType, maxResults, sortCriteria } = req.body;

      // call task service here.

      res.status(200).json([
        {
          id: 1,
          name: 'Task 1',
          isCompleted: false,
        },
      ]);
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
