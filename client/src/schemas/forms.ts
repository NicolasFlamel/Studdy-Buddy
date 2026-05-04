import { z } from 'zod';

export type ChatFormSchemaType = z.infer<typeof ChatFormSchema>;
export const ChatFormSchema = z.object({
  message: z.string().trim().min(1),
});
