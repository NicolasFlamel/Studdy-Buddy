'use client';

import { ScoresTableSelect } from 'drizzle/schema';
import { Button } from '@nextui-org/button';
import { Select, SelectItem } from '@nextui-org/select';
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

type SubjectScoresType = {
  vanillaJs: number;
  mySql: number;
  nodeJs: number;
  express: number;
  oop: number;
};
type SubjectType = { key: keyof SubjectScoresType; label: string };

interface ChatOptionsProps {
  scores: ScoresTableSelect;
}

const ChatOptions = ({ scores }: ChatOptionsProps) => {
  const { id, userId, ...subjectScores } = scores;
  const subjects: SubjectType[] = [
    { key: 'vanillaJs', label: 'VanillaJS' },
    { key: 'mySql', label: 'mySQL' },
    { key: 'nodeJs', label: 'Node.JS' },
    { key: 'express', label: 'Express' },
    { key: 'oop', label: 'OOP' },
  ];
  const scoreRows = Object.keys(subjectScores).map((subjectKey) => {
    const subjectObj = subjects.find((obj) => obj.key === subjectKey);

    if (!subjectObj) throw 'Could not find subject';

    const key = subjectObj.key;
    const subject = subjectObj.label;
    const score = subjectScores[key];

    return { key, subject, score };
  });

  return (
    <article className="flex justify-center gap-4">
      <section className="flex flex-wrap max-w-xs items-center gap-2">
        <Select label="Select Subject">
          {subjects.map((subject) => (
            <SelectItem key={subject.key}>{subject.label}</SelectItem>
          ))}
        </Select>
        <Button data-option="find">Find a buddy</Button>
      </section>
      <section>
        <Table>
          <TableHeader>
            <TableColumn key={'subject'}>Subject</TableColumn>
            <TableColumn key={'score'}>Score</TableColumn>
          </TableHeader>
          <TableBody items={scoreRows}>
            {(item) => {
              console.log('item', item);
              return (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
        <Button data-option="help">Help a buddy</Button>
      </section>
    </article>
  );
};

export default ChatOptions;
