import { z } from 'zod';

export type UsersSchemaType = z.infer<typeof UsersSchema>;
export const UsersSchema = z.object({
  id: z.uuid({ version: 'v7' }),
  username: z.string().trim().min(1, 'Cannot be empty.'),
  password: z.string().min(8, 'Must be at least 8 characters long.'),
  isActive: z.boolean(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export const CreateUserSchema = UsersSchema.omit({
  id: true,
  isActive: true,
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export const LoginSchema = UsersSchema.pick({
  username: true,
  password: true,
});
