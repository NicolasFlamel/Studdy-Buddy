import { UserIdType } from '@/types';
import { db } from '../index';
import { scores } from '../schema';
import { SUBJECTS } from '@shared/schemas';
import { sql } from 'drizzle-orm';

export const getScoresByUserId = (userId: UserIdType) => {
  return db.query.scores.findMany({
    where: { userId },
  });
};

type FilterType = {
  userId: UserIdType;
  subject: typeof scores.$inferSelect.subject;
};
export const getUserScoreBySubject = ({ userId, subject }: FilterType) => {
  return db.query.scores.findFirst({
    where: { userId, subject },
  });
};

export const createInitialScores = async (userId: UserIdType) => {
  const initialScores = SUBJECTS.map<typeof scores.$inferInsert>((subject) => ({
    userId,
    subject,
    rating: 1,
  }));

  await createScores(initialScores);

  return initialScores;
};

export const createScores = async (data: (typeof scores.$inferInsert)[]) => {
  const scoresData = await db
    .insert(scores)
    .values(data)
    .returning({ id: scores.id });

  if (scoresData.length === 0) throw new Error('Could not create scores');
  else if (scoresData.length !== 5)
    throw new Error('Failed to create some scores');

  return scoresData;
};

export const upsertScoreByUserId = async (
  data: (typeof scores.$inferInsert)[],
) => {
  const [scoreData] = await db
    .insert(scores)
    .values(data)
    .onConflictDoUpdate({
      target: [scores.subject, scores.userId],
      set: { rating: sql`EXCLUDED.rating` },
    })
    .returning({ id: scores.id });

  if (!scoreData) throw new Error('Could not update score');

  return scoreData;
};
