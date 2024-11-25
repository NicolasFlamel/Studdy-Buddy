'use server';

import { signIn } from 'auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
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
}

export const updateAssessment = async (formData: FormData) => {
  console.log(formData);
};
