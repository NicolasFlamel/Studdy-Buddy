import 'dotenv/config';
import express from 'express';
import { initSocket } from './config/socket';
import { createServer } from 'http';
import { ENV } from './utils/env';
import { logger } from './utils/logger';
import { appSetup } from './utils/setup';

const init = () => {
  const app = express();
  const httpServer = createServer(app);

  appSetup(app);

  const port = ENV.PORT || 3001;

  initSocket(httpServer);

  // run migrations before starting server
  // await migrate(db, { migrationsFolder: './drizzle' });
  httpServer.listen(port, () => {
    logger.info(`Now listening. PORT: ${port}`);
  });
};

init();
