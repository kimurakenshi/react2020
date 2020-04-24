import express from 'express';

import BaseError from '../error/error.base';

const router = express.Router({ mergeParams: true });

router.delete(
  '',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const params = req.params;

      // call task service here.

      res.status(200).json({ op: 'Delete' });
    } catch (e) {
      next(new BaseError({ code: e.code, message: e.message }, e.statusCode));
    }
  }
);

export default router;
