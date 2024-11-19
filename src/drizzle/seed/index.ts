import { scoresTable, usersTable } from 'drizzle/schema';
import { db } from 'drizzle/index';
import { usersSeeds, scoreSeeds } from './data';

async function main() {
  // delete tables incase data is already there
  await db.delete(scoresTable);
  await db.delete(usersTable);

  // insert data
  await db.insert(usersTable).values(usersSeeds);
  await db.insert(scoresTable).values(scoreSeeds);
  console.log('New users created!');

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users);
}

main();
