import bcrypt from 'bcrypt';
import { db } from 'drizzle/index';
import { scoresTable, usersTable } from 'drizzle/schema';
import { usersSeeds, scoreSeeds } from './data';

async function main() {
  // delete tables incase data is already there
  await db.delete(scoresTable);
  await db.delete(usersTable);

  const hashedUsers = await Promise.all(
    usersSeeds.map(async (user) => {
      const hashedPW = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPW };
    }),
  );

  // insert data
  await db.insert(usersTable).values(hashedUsers);
  await db.insert(scoresTable).values(scoreSeeds);
  console.log('New users created!');

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users);
}

main();
