import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import { AuthForm } from '@/components/auth/auth-form';
import { UsernameField } from '@/components/auth/username-field';
import { PasswordField } from '@/components/auth/password-field';
import { AuthContainer } from '@/components/auth/container';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginSchema,
  type LoginSchemaType,
} from '@studdy-buddy/shared/schemas/users';
import { Spinner } from '@/components/ui/spinner';
import { SubmitBtn } from '@/components/auth/submit-btn';
import { useLogin } from '@/hooks/login.mutation';
import { getUserFromClient } from '@/lib/before-load';

type InputType = LoginSchemaType;
const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { redirect } = Route.useSearch();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit: SubmitHandler<InputType> = async ({ username, password }) => {
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => navigate({ to: redirect ?? '/' }),
        onError: (error) => {
          if (error instanceof Response && error.status === 401) {
            form.setError('root', { message: 'Invalid credentials.' });
          } else {
            console.error(error);
            form.setError('root', { message: 'Something went wrong.' });
          }
        },
      },
    );
  };

  const isLoading = form.formState.isSubmitting || loginMutation.isPending;

  return (
    <AuthContainer>
      <FormProvider {...form}>
        <AuthForm title={'Login'} onSubmit={form.handleSubmit(onSubmit)}>
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
              {isLoading ? 'Logging in...' : 'Login'}
            </SubmitBtn>
          </FieldSet>
        </AuthForm>
      </FormProvider>
      <section className={'m-auto'}>
        <Button asChild variant={'link'}>
          <Link to={'/register'}>Don't have an account? Register</Link>
        </Button>
      </section>
    </AuthContainer>
  );
};

export const Route = createFileRoute('/login')({
  component: LoginPage,
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
