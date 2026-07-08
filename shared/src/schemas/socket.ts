import { z } from 'zod';

export const UserJoinClientDataSchema = z.object({
  username: z.string().trim().min(1),
  userId: z.number(),
});

export const MessagePayloadClientSchema = z.object({
  text: z.string().trim().min(1),
  timestamp: z.iso.datetime(),
});
