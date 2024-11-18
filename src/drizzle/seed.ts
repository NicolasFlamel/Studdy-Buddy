import { eq } from 'drizzle-orm';
import { usersTable, UsersTableInsert } from './schema';
import { db } from './index';
import usersSeed from './users.json';

async function main() {
  const user: UsersTableInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  // await db.insert(usersTable).values(user);
  await db.insert(usersTable).values(usersSeed);
  console.log('New user created!');

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users);

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!');
}

main();
