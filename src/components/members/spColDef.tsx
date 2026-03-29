import AirtableLinkCell from '@/components/ui/react-table/AirtableLink';
import HoverCardCell from '@/components/ui/react-table/HoverCardCell';
import ReactTableRoleCell from '@/components/ui/react-table/Role';
import TooltipWithLink from '@/components/ui/react-table/TooltipWithLink';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { createColumnHelper } from '@tanstack/table-core';
import {
  Globe,
  MessageCirclePlusIcon,
  MessageSquareIcon,
  StepForwardIcon,
} from 'lucide-react';

const columnHelper =
  createColumnHelper<SoloProjectSubmission>();

export const spColDef = (baseURL: string) => [
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
  columnHelper.display({
    id: 'Solo Project Internal Link',
    cell: ({ row }) => (
      <TooltipWithLink
        link={`/solo-project/${row.original.id}`}
        tooltip={`Go to Solo Project`}
        Icon={StepForwardIcon}
      />
    ),
  }),
  columnHelper.accessor((row) => row.fields['Timestamp'], {
    id: 'Timestamp',
    cell: ({ getValue }) => {
      const timestamp = getValue();
      return new Date(timestamp).toLocaleDateString(); // or your preferred format
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
  columnHelper.accessor((row) => row.fields['GitHub ID'], {
    id: 'GitHub ID',
    header: 'GitHub ID',
  }),
  columnHelper.accessor(
    (row) => row.fields['Evaluation Status'],
    {
      id: 'Evaluation Status',
      header: 'Status',
    }
  ),
  columnHelper.display({
    id: 'Github Repo',
    cell: ({ row }) => (
      <TooltipWithLink
        link={row.original.fields['GitHub Repo URL']}
        Icon={SiGithub}
        tooltip="Go to GitHub Repo"
      />
    ),
  }),
  columnHelper.display({
    id: 'Deployed App',
    cell: ({ row }) => (
      <TooltipWithLink
        link={row.original.fields['Deployed App URL']}
        Icon={Globe}
        tooltip="Go to Deployed App"
      />
    ),
  }),
  columnHelper.display({
    id: 'Feedback',
    cell: ({ row }) => (
      <HoverCardCell
        content={row.original.fields['Evaluation Feedback']}
        Icon={MessageSquareIcon}
      />
    ),
  }),
  columnHelper.display({
    id: 'Additional Comments',
    cell: ({ row }) => (
      <HoverCardCell
        content={row.original.fields['Addl. Comments']}
        Icon={MessageCirclePlusIcon}
      />
    ),
  }),
  columnHelper.display({
    id: 'Tier',
    header: 'Tier',
    cell: ({ row }) => {
      return (
        <span>
          {row.original.fields['Tier']
            ? row.original.fields['Tier'][5]
            : ''}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: 'Role',
    header: 'Role',
    cell: ({ row }) => (
      <ReactTableRoleCell
        role={row.original.fields['Role']}
      />
    ),
  }),
  columnHelper.accessor((row) => row.fields['Role Type'], {
    id: 'Role Type',
  }),
];
