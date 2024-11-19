import 'drizzle/envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

export const getUsers = async () => {
  const users = await db.query.usersTable.findMany();
  return users;
};