import { db } from 'drizzle';

export const getUser = async (username: string) => {
  const user = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.username, username),
  });
  return user;
};

export const getUserUsingId = async (UUID: string) => {
  const user = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.id, UUID),
  });
  return user;
};

export const getUserWithScores = async (username: string) => {
  const user = await db.query.usersTable.findFirst({
    where: (user, { eq }) => eq(user.username, username),
    with: { userScores: true },
  });
  return user;
};

export const getUsers = async () => {
  const users = await db.query.usersTable.findMany();
  return users;
};

export const getUserScores = async (userId: string) => {
  const scores = await db.query.scoresTable.findFirst({
    where: (score, { eq }) => eq(score.userId, userId),
  });
  return scores;
};
