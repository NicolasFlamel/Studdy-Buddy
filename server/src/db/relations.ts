import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  chats: {
    hostScore: r.one.scores({
      from: r.chats.scoreId,
      to: r.scores.id,
    }),
    host: r.one.users({
      from: r.chats.userId,
      to: r.users.id,
      alias: 'host',
    }),
    claimingUser: r.one.users({
      from: r.chats.claimedByUserId,
      to: r.users.id,
      alias: 'claim',
    }),
  },
  users: {
    hostedChats: r.one.chats({
      from: r.users.id,
      to: r.chats.userId,
      alias: 'host',
    }),
    claimedChats: r.one.chats({
      from: r.users.id,
      to: r.chats.claimedByUserId,
      alias: 'claim',
    }),
    schedules: r.many.schedules(),
    scores: r.many.scores(),
  },
  schedules: {
    user: r.one.users({
      from: r.schedules.userId,
      to: r.users.id,
    }),
  },
  scores: {
    chat: r.one.chats(),
    user: r.one.users({
      from: r.scores.userId,
      to: r.users.id,
    }),
  },
}));
