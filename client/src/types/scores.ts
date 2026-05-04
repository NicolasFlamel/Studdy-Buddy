import type { SubjectEnumType } from '@studdy-buddy/shared/schemas';

export type ScoresType = {
  [K in SubjectEnumType]: number;
};
