import { Input } from '../ui/input';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Controller, useFormContext } from 'react-hook-form';
import type {
  CreateUserSchemaType,
  LoginSchemaType,
} from '@studdy-buddy/shared/schemas/users';

type FormDataType = CreateUserSchemaType | LoginSchemaType;
export const UsernameField = () => {
  const { control } = useFormContext<FormDataType>();

  return (
    <Controller
      name={'username'}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Username:</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            disabled={formState.isSubmitting}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
