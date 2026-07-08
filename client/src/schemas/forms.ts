import { z } from 'zod';

export type ChatFormSchemaType = z.infer<typeof ChatFormSchema>;
export const ChatFormSchema = z.object({
  message: z.string().trim().min(1),
});

export type CreateScheduleFormSchemaType = z.infer<
  typeof CreateScheduleFormSchema
>;
export const CreateScheduleFormSchema = z.object({
  date: z.date(),
  time: z.iso.time(),
});
