import 'dotenv/config';
import express, { type Express as ExpressType } from 'express';
import { router } from '@/controllers/index';
import { CLIENT_DIST } from '@/utils/paths';
import { sessionMiddleware } from '@/config/session';
import { useExpressPino } from '@/utils/logger';

export const appSetup = (app: ExpressType) => {
  app.use(useExpressPino);
  app.set('trust proxy', 1);
  app.use(sessionMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(CLIENT_DIST));
  app.use(router);
  app.use((req, res, next) => {
    req.socket.on('close', () => {
      if (!res.writableEnded) res.end();
    });
    next();
  });
};
