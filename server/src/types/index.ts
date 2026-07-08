import { users } from '@/db/schema';

export type UserIdType = (typeof users.$inferSelect)['id'];
