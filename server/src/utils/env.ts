import { z } from 'zod';

const nonEmptyString = z.string().trim().min(1);

const envSchema = z.object({
  DATABASE_URL: nonEmptyString,
  AUTH_SECRET: nonEmptyString,
  PORT: nonEmptyString.optional(),
  LOG_LEVEL: nonEmptyString.optional(),
  NODE_ENV: nonEmptyString.optional(),
});

type Env = z.infer<typeof envSchema>;
const ENV: Env = envSchema.parse(process.env);

export { ENV };
