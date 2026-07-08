import type { Request, Response, NextFunction } from 'express';
import { reply } from './helpers';

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.status(401).json(reply(null, 'Must be logged in.'));
  } else {
    next();
  }
};
