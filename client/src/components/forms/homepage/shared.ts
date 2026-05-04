import type { GetScoresData } from '@studdy-buddy/shared/types/api';

type ScoreLabelsType = {
  key: NonNullable<GetScoresData>[number]['subject'];
  label: string;
}[];

export const scoreLabels = [
  { key: 'vanillaJs', label: 'Vanilla JavaScript' },
  { key: 'mySql', label: 'MySQL Relational Database' },
  { key: 'nodeJs', label: 'Node.JS Runtime Environment' },
  { key: 'express', label: 'Express JS Web Framework' },
  { key: 'oop', label: 'Object Oriented Programming' },
] satisfies ScoreLabelsType;
