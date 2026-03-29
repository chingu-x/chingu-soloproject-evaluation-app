import AirtableLinkCell from '@/components/ui/react-table/AirtableLink';
import { Application } from '@/types/ApplicationTypes';
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper = createColumnHelper<Application>();

export const appColDef = (baseURL: string) => [
  columnHelper.display({
    id: 'Airtable Link',
    cell: ({ row }) => {
      return (
        <AirtableLinkCell
          row={row}
          baseUrl={baseURL}
        />
      );
    },
  }),
  columnHelper.accessor(
    (row) => row.fields['Discord Name'],
    {
      id: 'Discord Name',
      header: 'Discord Name',
    }
  ),
  columnHelper.accessor((row) => row.fields['Email'], {
    id: 'Email',
    header: 'Email',
  }),
];
