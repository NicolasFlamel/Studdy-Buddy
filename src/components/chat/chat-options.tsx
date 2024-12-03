'use client';

import { SubjectScoresType } from 'types';
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
import { Link } from '@nextui-org/link';

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
      {/* Find Buddy */}
      <section className="flex flex-wrap max-w-xs items-center gap-2">
        <Select label="Select Subject" defaultSelectedKeys={[subjects[0].key]}>
          {subjects.map((subject) => (
            <SelectItem key={subject.key}>{subject.label}</SelectItem>
          ))}
        </Select>
        <Link href="/chat?type=learning&subject=vanillaJs">Find a buddy</Link>
      </section>
      {/* Subject Scores */}
      <section>
        <Table aria-label="Subject Scores">
          <TableHeader>
            <TableColumn key={'subject'}>Subject</TableColumn>
            <TableColumn key={'score'}>Score</TableColumn>
          </TableHeader>
          <TableBody items={scoreRows}>
            {(item) => {
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
        <Button>Help a buddy</Button>
      </section>
    </article>
  );
};

export default ChatOptions;
