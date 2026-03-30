import DiscordDMSheet from '@/components/soloprojects/DiscordDMSheet';
import MemberProfileLinkButton from '@/components/ui/navigation/MemberProfileLinkButton';
import AirtableLinkCell from '@/components/ui/react-table/AirtableLink';
import Role from '@/components/ui/react-table/Role';
import { TierMismatchDialog } from '@/components/voyages/signups/TierMismatchDialog';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper = createColumnHelper<VoyageSignup>();

export const singleVoyageColumnDef = (
  baseURL: string,
  withGrouping: boolean = true
) => [
  ...(withGrouping
    ? [
        columnHelper.accessor(
          (row) => row.fields['Team No.'],
          {
            id: 'teamNum',
            header: 'Team',
            enableGrouping: true,
            enableSorting: true,
            getGroupingValue: (row) =>
              `${row.fields['Team Name']} - ${row.fields['Team No.'] || 'no team'}`,
            // TODO: show how many active in the team
          }
        ),
      ]
    : []),
  columnHelper.display({
    id: 'action button',
    cell: ({ row }) => (
      <DiscordDMSheet
        discordId={row.original.fields['Discord ID']?.[0]}
        style={'compact'}
      />
    ),
  }),
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
    id: 'Member Profile Link',
    cell: ({ row }) => (
      <MemberProfileLinkButton
        discordId={row.original.fields['Discord ID']?.[0]}
      />
    ),
  }),
  columnHelper.accessor(
    (row) => row.fields['Discord Name'],
    {
      header: 'Discord Name',
    }
  ),
  columnHelper.display({
    id: 'Tier Mismatch',
    cell: ({ row }) => {
      const isMismatch =
        !!row.original.fields[
          'Solo Project Exceptions'
        ]?.trim();
      if (!isMismatch) return null;
      return (
        <TierMismatchDialog
          recordId={row.original.id}
          fields={row.original.fields}
        />
      );
    },
  }),
  // TODO: make it mouseover
  columnHelper.display({
    id: 'Info to Share',
    cell: ({ row }) => (
      <span>{row.original.fields['Info to Share']}</span>
    ),
  }),
  columnHelper.accessor((row) => row.fields['GitHub ID'], {
    header: 'Github Id',
  }),
  columnHelper.accessor((row) => row.fields['Status'], {
    header: 'Status',
  }),
  columnHelper.accessor((row) => row.fields['Role'], {
    header: 'Role',
    cell: ({ row }) => (
      <Role
        role={row.original.fields['Role']}
        status={row.original.fields['Status']}
      />
    ),
  }),
];
