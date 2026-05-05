import { z } from 'zod';
import { UsersSchema } from './users';
import { SchedulesSchema } from './schedules';

type ProfileSchemaType = typeof UserWithScheduleSchema;
export type UserWithScheduleSchemaDTOType = z.input<ProfileSchemaType>;
export type UserWithScheduleSchemaType = z.output<ProfileSchemaType>;
export const UserWithScheduleSchema = UsersSchema.omit({
  password: true,
}).safeExtend({
  schedules: SchedulesSchema.array(),
});
