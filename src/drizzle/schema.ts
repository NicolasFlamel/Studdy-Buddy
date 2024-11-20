import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Table Exports

export const usersTable = pgTable(
  'users',
  {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 225 }).notNull(),
    isActive: boolean().default(false),
  },
  (table) => [uniqueIndex('username_idx').on(table.username)],
);

export const scoresTable = pgTable(
  'scores',
  {
    id: uuid().primaryKey().defaultRandom(),
    vanillaJs: integer().notNull(),
    mySql: integer().notNull(),
    nodeJs: integer().notNull(),
    express: integer().notNull(),
    oop: integer().notNull(),
    userId: uuid()
      .unique()
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [uniqueIndex('scores_userId_idx').on(table.userId)],
);

export const chatsTable = pgTable(
  'chats',
  {
    id: uuid().primaryKey().defaultRandom(),
    subject: varchar({
      enum: ['vanillaJs', 'mySql', 'nodeJs', 'express', 'oop'],
    }),
    subjectScore: integer().notNull().default(0),
    isOpen: boolean().notNull().default(false),
    userId: uuid()
      .unique()
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [uniqueIndex('chats_userId_idx').on(table.userId)],
);

// Relations Exports

export const userRelations = relations(usersTable, ({ one }) => ({
  userScores: one(scoresTable),
}));
export const scoresRelations = relations(scoresTable, ({ one }) => ({
  scoresUser: one(usersTable, {
    fields: [scoresTable.userId],
    references: [usersTable.id],
  }),
}));

// Type Exports

export type UsersTableInsert = typeof usersTable.$inferInsert;
export type UsersTableSelect = typeof usersTable.$inferSelect;
export type ScoresTableInsert = typeof scoresTable.$inferInsert;
export type ScoresTableSelect = typeof scoresTable.$inferSelect;
export type ChatsTableInsert = typeof chatsTable.$inferInsert;
export type ChatsTableSelect = typeof chatsTable.$inferSelect;
