import TooltipWithLink from '@/components/ui/react-table/TooltipWithLink';
import { Schedule } from '@/types/ScheduleTypes';
import { createColumnHelper } from '@tanstack/table-core';
import { CheckCheckIcon } from 'lucide-react';

export const columnHelper = createColumnHelper<Schedule>();

export const scheduleColDef = [
  columnHelper.display({
    header: 'Name',
    cell: ({ row }) => (
      <TooltipWithLink
        tooltip={`Go to V${row.original.fields['Name'].slice(1)} sign ups`}
        link={`/admin/voyage/${row.original.fields['Name'].slice(1)}/signups`}
        linkText={`V${row.original.fields['Name'].slice(1)}`}
      />
    ),
  }),
  columnHelper.accessor(
    (row) => row.fields['Solo Project Deadline'],
    {
      header: 'Solo Project Deadline',
    }
  ),
  columnHelper.accessor((row) => row.fields['Start Date'], {
    header: 'Start Date',
  }),
  columnHelper.accessor((row) => row.fields['End Date'], {
    header: 'End Date',
  }),
  columnHelper.display({
    id: 'Check in link',
    cell: ({ row }) => (
      <TooltipWithLink
        tooltip={`Go to V${row.original.fields['Name'].slice(1)} check in`}
        link={`/admin/check-in/V${row.original.fields['Name'].slice(1)}`}
        Icon={CheckCheckIcon}
      />
    ),
  }),
];
