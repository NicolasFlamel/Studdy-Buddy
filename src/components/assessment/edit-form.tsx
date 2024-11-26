'use client';

import { useActionState } from 'react';
import { SubjectScoresType } from 'types';
import { State, updateAssessment } from 'lib/actions';
import { Button } from '@nextui-org/button';
import { RadioGroup, Radio, RadioGroupProps } from '@nextui-org/radio';
import { CardBody, CardFooter } from '@nextui-org/card';

type AssessmentSectionsType = { name: keyof SubjectScoresType; text: string }[];
const assessmentSections: AssessmentSectionsType = [
  {
    name: 'vanillaJs',
    text: 'Vanilla JS: functions, looping, scope, es6 syntax etc',
  },
  {
    name: 'mySql',
    text: 'MYSQL - Joins, queries, schemas, seeds',
  },
  {
    name: 'nodeJs',
    text: 'Node.JS - what is it? requiring, exporting, packages',
  },
  {
    name: 'express',
    text: 'Express - starting server, defining routes, serving html/data',
  },
  {
    name: 'oop',
    text: 'OOP - Constructors, promises, classes etc',
  },
];

interface FormErrorProps {
  id: string;
  errors: string[] | undefined;
}
const FormError = ({ id, errors }: FormErrorProps) => {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors &&
        errors.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
};

interface RadioOptionsProps extends RadioGroupProps {
  name: keyof SubjectScoresType;
  scores?: SubjectScoresType;
}
const RadioOptions = ({ name, scores, ...props }: RadioOptionsProps) => {
  const defaultValue = scores ? scores[name].toString() : '1';

  return (
    <RadioGroup
      name={name}
      label="Select your understanding level"
      orientation="horizontal"
      defaultValue={defaultValue}
      {...props}
    >
      <Radio value={'1'}>1</Radio>
      <Radio value={'2'}>2</Radio>
      <Radio value={'3'}>3</Radio>
      <Radio value={'4'}>4</Radio>
      <Radio value={'5'}>5</Radio>
    </RadioGroup>
  );
};

interface AssessmentEditFormProps {
  userId: string;
  scores?: SubjectScoresType;
}
const AssessmentEditForm = ({ userId, scores }: AssessmentEditFormProps) => {
  const initialState: State = { message: null, errors: {} };
  const updatedAssessmentWithId = updateAssessment.bind(null, userId);
  const [state, formAction] = useActionState(
    updatedAssessmentWithId,
    initialState,
  );

  return (
    <form action={formAction}>
      <CardBody className="grid justify-center gap-4 p-4">
        {assessmentSections.map((section) => (
          <section key={section.name}>
            <p>{section.text}</p>
            <RadioOptions
              name={section.name}
              scores={scores}
              aria-describedby={section.name + '-error'}
            />
            {/* Errors */}
            <FormError
              id={section.name + '-error'}
              errors={state.errors ? state.errors[section.name] : undefined}
            />
          </section>
        ))}
      </CardBody>
      <CardFooter className="justify-end">
        {/* <!--Submit button--> */}
        <Button type="submit">Update</Button>
      </CardFooter>
    </form>
  );
};

export default AssessmentEditForm;
