import z from 'zod';
import { UsersSchema } from './users';

export const SUBJECTS = [
  'vanillaJs',
  'mySql',
  'nodeJs',
  'express',
  'oop',
] as const;
export type SubjectEnumType = z.infer<typeof SubjectEnumSchema>;
export const SubjectEnumSchema = z.enum(SUBJECTS);
export type ScoresSchemaType = z.infer<typeof ScoresSchema>;
export const ScoresSchema = z.object({
  id: z.uuid({ version: 'v7' }),
  subject: SubjectEnumSchema,
  rating: z.number().min(1).max(5),
  userId: UsersSchema.shape.id,
});

export type CreateScoresSchemaType = z.infer<typeof CreateScoresSchema>;
export const CreateScoresSchema = ScoresSchema.omit({ id: true });

const ScoreFormSchema = z.coerce
  .number<string | number>()
  .pipe(ScoresSchema.shape.rating);
export type ScoresFormType = z.infer<typeof ScoresForm>;
export const ScoresForm = z.record(SubjectEnumSchema, ScoreFormSchema);
