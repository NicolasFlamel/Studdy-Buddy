import { z } from 'zod';
import { UsersSchema } from './users';

export type SchedulesSchemaType = z.infer<typeof SchedulesSchema>;
export const SchedulesSchema = z.object({
  id: z.uuid({ version: 'v7' }),
  date: z.coerce.date<string | Date>(),
  userId: UsersSchema.shape.id,
});

export type CreateScheduleSchemaType = z.infer<typeof CreateScheduleSchema>;
export const CreateScheduleSchema = SchedulesSchema.omit({ id: true });

export type EditScheduleSchemaType = z.infer<typeof EditScheduleSchema>;
export const EditScheduleSchema = SchedulesSchema.omit({ userId: true });
