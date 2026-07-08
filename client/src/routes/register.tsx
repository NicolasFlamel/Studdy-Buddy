import { AuthForm } from '@/components/auth/auth-form';
import { PasswordField } from '@/components/auth/password-field';
import { SubmitBtn } from '@/components/auth/submit-btn';
import { UsernameField } from '@/components/auth/username-field';
import { Button } from '@/components/ui/button';
import { FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import {
  CreateUserSchema,
  type CreateUserSchemaType,
} from '@studdy-buddy/shared/schemas/users';
import { AuthContainer } from '@/components/auth/container';
import { Spinner } from '@/components/ui/spinner';
import { useRegister } from '@/hooks/register.mutation';
import { getUserFromClient } from '@/lib/before-load';

type InputType = CreateUserSchemaType;
const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const form = useForm({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit: SubmitHandler<InputType> = async ({ username, password }) => {
    registerMutation.mutate(
      { username, password },
      {
        onSuccess: () => navigate({ to: '/' }),
        onError: (error) => {
          if (error instanceof Response && error.status === 409) {
            form.setError('username', { message: 'Username is taken.' });
          } else {
            console.error(error);
            form.setError('root', { message: 'Something went wrong.' });
          }
        },
      },
    );
  };

  const isLoading = form.formState.isSubmitting || registerMutation.isPending;

  return (
    <AuthContainer>
      <FormProvider {...form}>
        <AuthForm title={'Register'} onSubmit={form.handleSubmit(onSubmit)}>
          {form.formState.errors.root && (
            <FieldError>{form.formState.errors.root.message}</FieldError>
          )}
          <FieldSet disabled={isLoading}>
            <FieldGroup>
              <UsernameField />
              <PasswordField />
            </FieldGroup>
            <SubmitBtn>
              {isLoading && <Spinner />}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </SubmitBtn>
          </FieldSet>
        </AuthForm>
      </FormProvider>
      <section className={'m-auto'}>
        <Button asChild variant={'link'}>
          <Link to={'/login'}>Already have an account? Login</Link>
        </Button>
      </section>
    </AuthContainer>
  );
};

export const Route = createFileRoute('/register')({
  component: RegisterPage,
  validateSearch: (search) => {
    return search.redirect ? { redirect: String(search.redirect) } : {};
  },
  beforeLoad: async ({ context, search }) => {
    const user = await getUserFromClient(context.queryClient);

    if (user) {
      throw redirect({ to: search.redirect ?? '/' });
    }
  },
});
