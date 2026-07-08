import { z } from 'zod';

export const uuidSchema = z.uuid({ version: 'v7' });

export * from './chats';
export * from './relations';
export * from './schedules';
export * from './scores';
export * from './socket';
export * from './users';
