import { db } from '..';
import { and, eq } from 'drizzle-orm';
import { schedules } from '../schema';

type ScheduleIdType = (typeof schedules.$inferSelect)['id'];
type UserIdType = (typeof schedules.$inferSelect)['userId'];
type ConditionMatch = { id: ScheduleIdType; userId: UserIdType };
type UpdateScheduleType = Partial<typeof schedules.$inferInsert>;

const scheduleIdAndUserIdMatch = ({ id, userId }: ConditionMatch) =>
  and(eq(schedules.id, id), eq(schedules.userId, userId));

export const updateSchedule = (
  data: UpdateScheduleType,
  condition: ConditionMatch,
) => db.update(schedules).set(data).where(scheduleIdAndUserIdMatch(condition));

export const deleteSchedule = (condition: ConditionMatch) =>
  db.delete(schedules).where(scheduleIdAndUserIdMatch(condition));
