import express from 'express';

import BaseError from '../error/error.base';

const router = express.Router();

router.put(
  '',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // const { searchText, recordType, maxResults, sortCriteria } = req.body;

      // call task service here.

      res.status(200).json({ op: 'Update' });
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
