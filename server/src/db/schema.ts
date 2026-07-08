import { v7 as uuidv7 } from 'uuid';
import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  json,
  boolean,
  index,
  text,
  unique,
  check,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const chats = pgTable(
  'chats',
  {
    id: uuid().primaryKey().$defaultFn(uuidv7),
    scoreId: uuid('score_id')
      .notNull()
      .references(() => scores.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    userId: uuid('user_id')
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    claimedByUserId: uuid('claimed_by_user_id').references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('one_claim_per_user_idx')
      .on(table.claimedByUserId)
      .where(sql`${table.claimedByUserId} IS NOT NULL`),
  ],
);

export const schedules = pgTable('schedules', {
  id: uuid().primaryKey().$defaultFn(uuidv7),
  date: timestamp({ withTimezone: true }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onUpdate: 'cascade' }),
});

export const scores = pgTable(
  'scores',
  {
    id: uuid().primaryKey().$defaultFn(uuidv7),
    subject: text().default('vanillaJs').notNull(),
    rating: integer().default(1).notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => [
    check('score_check', sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
    unique().on(table.subject, table.userId),
  ],
);

export const sessions = pgTable(
  'sessions',
  {
    sid: varchar().primaryKey(),
    sess: json().notNull(),
    expire: timestamp({ precision: 6 }).notNull(),
  },
  (table) => [
    index('IDX_session_expire').using('btree', table.expire.asc().nullsLast()),
  ],
);

export const users = pgTable('users', {
  id: uuid().primaryKey().$defaultFn(uuidv7),
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  isActive: boolean('is_active').default(false).notNull(),
});
