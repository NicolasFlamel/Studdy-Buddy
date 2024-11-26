'use server';

import { signIn } from 'auth';
import { updateUserScores } from 'drizzle';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type State = {
  errors?: {
    vanillaJs?: string[];
    mySql?: string[];
    nodeJs?: string[];
    express?: string[];
    oop?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  vanillaJs: z.coerce
    .number({ invalid_type_error: 'Please select a value.' })
    .gt(0)
    .lt(6),
  mySql: z.coerce
    .number({ invalid_type_error: 'Please select a value.' })
    .gt(0)
    .lt(6),
  nodeJs: z.coerce
    .number({ invalid_type_error: 'Please select a value.' })
    .gt(0)
    .lt(6),
  express: z.coerce
    .number({ invalid_type_error: 'Please select a value.' })
    .gt(0)
    .lt(6),
  oop: z.coerce
    .number({ invalid_type_error: 'Please select a value.' })
    .gt(0)
    .lt(6),
});

const UpdateAssessment = FormSchema.omit({});

export const updateAssessment = async (
  userId: string,
  prevState: State,
  formData: FormData,
): Promise<State> => {
  const validatedFields = UpdateAssessment.safeParse({
    vanillaJs: formData.get('vanillaJs'),
    mySql: formData.get('mySql'),
    nodeJs: formData.get('nodeJs'),
    express: formData.get('express'),
    oop: formData.get('oop'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Assessment.',
    };
  }

  const scores = validatedFields.data;

  try {
    updateUserScores(userId, scores);
  } catch {
    return { message: 'Database Error: Failed to Update Assessment.' };
  }

  revalidatePath('/assessments');
  redirect('/');
};

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    const username = formData.get('username');
    const password = formData.get('password');
    const singInOptions = { username, password, redirectTo: '/' };

    await signIn('credentials', singInOptions);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};
