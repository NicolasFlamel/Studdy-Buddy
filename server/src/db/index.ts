import 'dotenv/config';
import { ENV } from '@/utils/env';
import { Pool } from 'pg';
import { relations } from './relations';
import { drizzle } from 'drizzle-orm/node-postgres';

export const pool = new Pool({ connectionString: ENV.DATABASE_URL });
export const db = drizzle({
  client: pool,
  relations,
  casing: 'snake_case',
});
