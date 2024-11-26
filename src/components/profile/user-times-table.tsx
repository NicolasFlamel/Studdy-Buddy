'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  TableProps,
} from '@nextui-org/table';

const tempData = [
  {
    date: 'Fri Aug 11 2023',
    time: '17:01:51 GMT-0700 (Pacific Daylight Time)',
  },
  {
    date: 'Fri Aug 12 2023',
    time: '15:12:10 GMT-0700 (Pacific Daylight Time)',
  },
  {
    date: 'Fri Aug 13 2023',
    time: '11:29:35 GMT-0700 (Pacific Daylight Time)',
  },
  {
    date: 'Fri Aug 14 2023',
    time: '07:21:24 GMT-0700 (Pacific Daylight Time)',
  },
];

interface UserAvailabilityTableProps extends TableProps {
  data?: unknown;
}
const UserAvailabilityTable = ({ className }: UserAvailabilityTableProps) => {
  return (
    <Table className={className} aria-label="Example static collection table">
      <TableHeader>
        <TableColumn maxWidth={10}>Date</TableColumn>
        <TableColumn maxWidth={10}>Time</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>{tempData[0].date}</TableCell>
          <TableCell>{tempData[0].time}</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>{tempData[1].date}</TableCell>
          <TableCell>{tempData[1].time}</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>{tempData[2].date}</TableCell>
          <TableCell>{tempData[2].time}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>{tempData[3].date}</TableCell>
          <TableCell>{tempData[3].time}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserAvailabilityTable;

// <ul>
//  {/* {{#each scheduleData}} */}
//  <li>
//    <h3>{'{date}'}</h3>
//    {/* {{#if @root.ownProfile}} */}
//    <Button data-id="{{id}}">delete</Button>
//    {/* {{/if}} */}
//   </li>
//  {/* {{/each}} */}
//  </ul>
