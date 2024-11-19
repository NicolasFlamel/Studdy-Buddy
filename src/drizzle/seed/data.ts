import { ScoresTableInsert, UsersTableInsert } from 'drizzle/schema';

export const usersSeeds: UsersTableInsert[] = [
  {
    id: '829d1137-f230-4015-b1eb-89e7f39c6165',
    username: 'Ornaolyp',
    password: 'password1',
  },
  {
    id: 'eb817393-8b12-4910-9daf-e90a615118fc',
    username: 'Kertasma',
    password: 'password2',
  },
  {
    id: 'ac871e63-4255-4b9e-a800-3e40c0887b8f',
    username: 'Sauntrae',
    password: 'password3',
  },
  {
    id: '8ceca260-7043-4176-bb2d-e6c95ed01727',
    username: 'Ionalinu',
    password: 'password4',
  },
  {
    id: 'b5eb4c6f-3bfa-4c93-b54b-853e45f3a38e',
    username: 'Andransm',
    password: 'password5',
  },
];

export const scoreSeeds: ScoresTableInsert[] = [
  {
    vanillaJs: 1,
    mySql: 2,
    nodeJs: 3,
    express: 4,
    oop: 5,
    userId: '829d1137-f230-4015-b1eb-89e7f39c6165',
  },
  {
    vanillaJs: 2,
    mySql: 3,
    nodeJs: 4,
    express: 5,
    oop: 1,
    userId: 'eb817393-8b12-4910-9daf-e90a615118fc',
  },
  {
    vanillaJs: 3,
    mySql: 4,
    nodeJs: 5,
    express: 1,
    oop: 2,
    userId: 'ac871e63-4255-4b9e-a800-3e40c0887b8f',
  },
  {
    vanillaJs: 4,
    mySql: 5,
    nodeJs: 1,
    express: 2,
    oop: 3,
    userId: '8ceca260-7043-4176-bb2d-e6c95ed01727',
  },
  {
    vanillaJs: 5,
    mySql: 1,
    nodeJs: 2,
    express: 3,
    oop: 4,
    userId: 'b5eb4c6f-3bfa-4c93-b54b-853e45f3a38e',
  },
];
