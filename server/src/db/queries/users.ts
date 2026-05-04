import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '../index';
import { chats, users } from '../schema';

const saltRounds = 10;

export const getUserById = (id: (typeof users.$inferSelect)['id']) => {
  return db.query.users.findFirst({
    where: { id },
  });
};

export const getUserByUsername = (
  username: (typeof users.$inferSelect)['username'],
) => {
  return db.query.users.findFirst({
    where: { username },
  });
};

export const getUserByIdPublic = (id: (typeof users.$inferSelect)['id']) => {
  return db.query.users.findFirst({
    where: { id },
    columns: { id: true, username: true, isActive: true },
  });
};

export const getUserByIdWithChat = (id: (typeof users.$inferSelect)['id']) => {
  return db
    .select()
    .from(users)
    .leftJoin(chats, eq(chats.userId, users.id))
    .where(eq(users.id, id));
};

export const createUser = async (data: typeof users.$inferInsert) => {
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const [userData] = await db
    .insert(users)
    .values({ ...data, password: hashedPassword })
    .returning({
      id: users.id,
      username: users.username,
      isActive: users.isActive,
    });

  if (!userData) throw new Error('Could not create a user');

  return userData;
};

export const updateUser = async (
  id: (typeof users.$inferSelect)['id'],
  data: Partial<typeof users.$inferInsert>,
) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, saltRounds);
  }

  const [userData] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning({ id: users.id });

  if (!userData) throw new Error('Could not update user');

  return userData;
};
