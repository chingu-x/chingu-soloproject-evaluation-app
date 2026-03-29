import AirtableLinkCell from '@/components/ui/react-table/AirtableLink';
import HoverCardCell from '@/components/ui/react-table/HoverCardCell';
import Role from '@/components/ui/react-table/Role';
import TooltipWithLink from '@/components/ui/react-table/TooltipWithLink';
import ReactTableVoyageStatusCell from '@/components/ui/react-table/VoyageStatus';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { createColumnHelper } from '@tanstack/table-core';
import { Clipboard, Info } from 'lucide-react';

const columnHelper = createColumnHelper<VoyageSignup>();

// voyage Signup column Definitions for Member Profile Page
export const vsColDef = (baseURL: string) => [
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
  columnHelper.accessor((row) => row.fields['Timestamp'], {
    id: 'Timestamp',
    cell: ({ getValue }) => {
      const timestamp = getValue();
      return new Date(timestamp).toLocaleDateString(); // or your preferred format
    },
  }),
  columnHelper.display({
    id: 'Voyage',
    header: 'Voyage',
    cell: ({ row }) => {
      const voyageNum =
        row.original.fields.Voyage?.slice(1);
      return (
        <TooltipWithLink
          tooltip={`Go to V${voyageNum}`}
          link={`/admin/voyage/${voyageNum}/signups`}
          linkText={`V${voyageNum}`}
        />
      );
    },
  }),
  columnHelper.display({
    id: 'Tier',
    header: 'Tier',
    cell: ({ row }) => {
      return <span>{row.original.fields['Tier'][5]}</span>;
    },
  }),
  columnHelper.display({
    id: 'Team No.',
    header: 'Team No.',
    cell: ({ row }) => {
      const voyageNum =
        row.original.fields.Voyage?.slice(1);
      const teamNum = row.original.fields['Team No.'];
      return (
        <TooltipWithLink
          tooltip={`Go to V${voyageNum} Team ${teamNum}`}
          link={`/admin/voyage/${voyageNum}/team/${teamNum}`}
          linkText={teamNum}
        />
      );
    },
  }),
  columnHelper.display({
    id: 'Status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <ReactTableVoyageStatusCell
          status={row.original.fields['Status']}
        />
      );
    },
  }),
  columnHelper.display({
    id: 'Status Comment',
    header: 'Status Comment',
    cell: ({ row }) => (
      <HoverCardCell
        content={row.original.fields['Status Comment']}
        Icon={Clipboard}
      />
    ),
  }),
  columnHelper.display({
    id: 'Info to Share',
    header: 'Info',
    cell: ({ row }) => (
      <HoverCardCell
        content={row.original.fields['Info to Share']}
        Icon={Info}
      />
    ),
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
  columnHelper.display({
    id: 'Role',
    header: 'Role',
    cell: ({ row }) => (
      <Role
        role={row.original.fields['Role']}
        status={row.original.fields['Status']}
      />
    ),
  }),
  columnHelper.accessor((row) => row.fields['Role Type'], {
    id: 'Role Type',
  }),
];
