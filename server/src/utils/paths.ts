import path from 'path';

export const CLIENT_DIST =
  process.env.CLIENT_DIST ?? path.resolve(process.cwd(), 'client/dist');
