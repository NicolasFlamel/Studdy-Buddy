import React from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScoresForm } from '@studdy-buddy/shared/schemas/scores';
import { useScoresMutation } from '@/hooks/scores.mutation';
import {
  Field,
  FieldError,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '../ui/field';
import type { ScoresType } from '@/types/scores';
import { useNavigate } from '@tanstack/react-router';
import { Slider } from '../ui/slider';

interface AssessmentFormProps {
  initialValues: ScoresType;
}
export const AssessmentForm = ({ initialValues }: AssessmentFormProps) => {
  const navigate = useNavigate({ from: '/assessment' });
  const coercedInitialValues = Object.fromEntries(
    Object.entries(initialValues).map(([k, v]) => [k, String(v)]),
  );
  const form = useForm({
    resolver: zodResolver(ScoresForm),
    defaultValues: { ...coercedInitialValues },
  });
  const scoresMutation = useScoresMutation();

  const onSubmit: SubmitHandler<ScoresType> = (values) => {
    scoresMutation.mutate(values, { onSuccess: handleSuccessfulUpdate });
  };

  const handleSuccessfulUpdate = () => {
    navigate({ to: '/' });
  };

  const isLoading = form.formState.isSubmitting || scoresMutation.isPending;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={'flex flex-col gap-8 p-4 bg-card shadow-lg rounded-md'}
    >
      {form.formState.errors.root && (
        <FieldError>{form.formState.errors.root.message}</FieldError>
      )}
      <FieldSet disabled={isLoading}>
        {formFields.map((formField) => {
          return (
            <React.Fragment key={formField.name}>
              <Controller
                name={formField.name}
                control={form.control}
                render={({
                  field: { onChange, value, ...rest },
                  fieldState,
                  formState,
                }) => (
                  <Field
                    orientation={'horizontal'}
                    className={
                      'flex-wrap md:grid md:grid-cols-[1fr_300px_auto]'
                    }
                  >
                    <FieldTitle className={'max-w-xs'}>
                      {formField.description}
                    </FieldTitle>
                    <Slider
                      {...rest}
                      min={1}
                      max={5}
                      step={1}
                      value={[Number(value)]}
                      onValueChange={([v]) => onChange(v)}
                      disabled={formState.isSubmitting || isLoading}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <p
                      className={
                        'bg-primary text-primary-foreground rounded-md px-4 py-2 m-auto'
                      }
                    >
                      {value}
                    </p>
                  </Field>
                )}
              />
              <FieldSeparator />
            </React.Fragment>
          );
        })}
        <Button type={'submit'}>
          {isLoading && <Spinner />}
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </FieldSet>
    </form>
  );
};

const formFields = [
  {
    description: 'Vanilla JS - functions, looping, scope, es6 syntax etc',
    name: 'vanillaJs',
    values: [1, 2, 3, 4, 5],
  },
  {
    description: 'MYSQL - Joins, queries, schemas, seeds',
    name: 'mySql',
    values: [1, 2, 3, 4, 5],
  },
  {
    description: 'Node.JS - what is it? requiring, exporting, packages',
    name: 'nodeJs',
    values: [1, 2, 3, 4, 5],
  },
  {
    description:
      'Express - starting server, defining routes, serving html/data',
    name: 'express',
    values: [1, 2, 3, 4, 5],
  },
  {
    description:
      'Object Oriented Programming - Constructors, promises, classes etc',
    name: 'oop',
    values: [1, 2, 3, 4, 5],
  },
] as const;
