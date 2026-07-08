import { Button } from '@/components/ui/button';
import { scoreLabels } from './shared';
import type { GetScoresData } from '@studdy-buddy/shared/types/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFormSync } from '@/context/form-sync-provider';
import { Link } from '@tanstack/react-router';

interface Props {
  scores: GetScoresData;
}
export const HelperForm = ({ scores }: Props) => {
  const formSync = useFormSync();

  return (
    <section
      className={
        'flex flex-col gap-2 justify-center mt-auto h-full [&>div]:grow'
      }
    >
      <Table className={'h-full text-base'}>
        <TableHeader>
          <TableRow className={'[&_th]:font-bold'}>
            <TableHead>Subject</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scoreLabels.map(({ key, label }) => (
            <TableRow key={key}>
              <TableCell scope="row">{label}</TableCell>
              <TableCell>
                {scores.find((score) => score.subject === key)?.rating}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button asChild disabled={formSync.isSubmitting}>
        <Link to={'/chats/search'}>Be a buddy</Link>
      </Button>
    </section>
  );
};
