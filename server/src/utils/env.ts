import { z } from 'zod';

const nonEmptyString = z.string().trim().min(1);

const envSchema = z.object({
  PORT: nonEmptyString.optional(),
  DATABASE_URL: nonEmptyString,
  LOG_LEVEL: nonEmptyString.optional(),
  NODE_ENV: nonEmptyString.optional(),
  AUTH_SECRET: nonEmptyString,
  DB_NAME_PSQL: nonEmptyString,
  DB_USER_PSQL: nonEmptyString,
  DB_PASSWORD_PSQL: nonEmptyString,
  DB_HOST: nonEmptyString,
  DB_PORT: nonEmptyString,
});

type Env = z.infer<typeof envSchema>;
const ENV: Env = envSchema.parse(process.env);

export { ENV };
