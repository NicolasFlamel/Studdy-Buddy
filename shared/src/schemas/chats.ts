import { z } from 'zod';
import { ScoresSchema } from './scores';
import { UsersSchema } from './users';

export type ChatsSchemaType = z.infer<typeof ChatsSchema>;
export const ChatsSchema = z.object({
  id: z.uuid({ version: 'v7' }),
  scoreId: ScoresSchema.shape.id,
  userId: UsersSchema.shape.id,
  claimedByUserId: UsersSchema.shape.id.optional(),
  created_at: z.coerce.date<string | Date>(),
});

export type CreateChatSchemaType = z.infer<typeof CreateChatSchema>;
export const CreateChatSchema = ChatsSchema.omit({
  id: true,
  created_at: true,
});

export type GetChatMetadataSchemaType = z.infer<typeof GetChatMetadataSchema>;
export const GetChatMetadataSchema = z.object({
  id: ChatsSchema.shape.id,
  subject: ScoresSchema.shape.subject,
  host: z.object({
    id: UsersSchema.shape.id,
    username: UsersSchema.shape.username,
  }),
  claimer: z
    .object({
      id: UsersSchema.shape.id,
      username: UsersSchema.shape.username,
    })
    .nullable(),
});
