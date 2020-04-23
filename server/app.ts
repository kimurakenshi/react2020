import express from 'express';
import { API_ROUTES } from '../src/core/data/data.constants';
import { allController } from './core/controller';
import path from 'path';
import { errorMiddleware } from './error';
import { taskController } from './task';

const app = express();

app.use(express.static(path.resolve('dist', 'client')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use(API_ROUTES.ALL, allController);
app.use(API_ROUTES.TASKS, taskController);

// ERROR MIDDLEWARE
// @ts-ignore
app.use(errorMiddleware);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
  const portNumber = parseInt(val, 10);

  if (isNaN(portNumber)) {
    return val;
  }

  if (portNumber >= 0) {
    return portNumber;
  }

  return false;
}

const port = normalizePort(5000);

app.set('port', port);

export { app, port };
