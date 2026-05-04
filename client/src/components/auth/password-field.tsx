import type {
  CreateUserSchemaType,
  LoginSchemaType,
} from '@studdy-buddy/shared/schemas/users';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Controller, useFormContext } from 'react-hook-form';

type FormDataType = CreateUserSchemaType | LoginSchemaType;
export const PasswordField = () => {
  const { control } = useFormContext<FormDataType>();

  return (
    <Controller
      name={'password'}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Password:</FieldLabel>
          <Input
            {...field}
            id={field.name}
            type="password"
            aria-invalid={fieldState.invalid}
            disabled={formState.isSubmitting}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
