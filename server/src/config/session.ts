import session, { SessionOptions } from 'express-session';
import connectPg from 'connect-pg-simple';
import { ENV } from '@/utils/env';
import { pool } from '../db';

const PgStore = connectPg(session);

const sess: SessionOptions = {
  name: 'studdy.buddy.sid',
  secret: ENV.AUTH_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new PgStore({
    pool,
    createTableIfMissing: true,
    tableName: 'sessions',
  }),
};

export const sessionMiddleware = session(sess);
