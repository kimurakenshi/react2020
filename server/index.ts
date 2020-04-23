import http from 'http';
import { app, port } from './app';

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

// eslint-disable-next-line
server.on('error', (err: any) => console.error(err));

// eslint-disable-next-line
server.on('listening', () =>
  console.info(`==> 🌎  Serve is running on ${port}`)
);
