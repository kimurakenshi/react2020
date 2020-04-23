import express from 'express';

import { TASK_ROUTES } from './task.constants';
import taskListController from './task-list.controller';
import taskCreateController from './task-create.controller';
import taskUpdateController from './task-update.controller';
import taskDeleteController from './task-delete.controller';

const router = express.Router();

// Order matters here so don't change them unless you know what you are doing.
router.use(TASK_ROUTES.LIST, taskListController);
router.use(TASK_ROUTES.TASK, taskCreateController);
router.use(TASK_ROUTES.TASK, taskUpdateController);
router.use(TASK_ROUTES.TASK, taskDeleteController);

export default router;
