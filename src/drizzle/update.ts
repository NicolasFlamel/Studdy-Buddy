import { db } from 'drizzle';
import { scoresTable } from './schema';
import { eq } from 'drizzle-orm';
import { SubjectScoresType } from 'types';

export const updateUserScores = async (
  userId: string,
  scores: SubjectScoresType,
) => {
  const data = await db
    .update(scoresTable)
    .set(scores)
    .where(eq(scoresTable.userId, userId));

  console.log('data', data);
};
