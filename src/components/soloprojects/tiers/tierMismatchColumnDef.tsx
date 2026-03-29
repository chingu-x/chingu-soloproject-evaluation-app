import SetTierBtn from '@/components/soloprojects/tiers/SetTierBtn';
import TooltipWithLink from '@/components/ui/react-table/TooltipWithLink';
import { urlLinkParser } from '@/lib/urlLinkParser';
import {
  SoloProjectSubmission,
  SoloProjectTier,
} from '@/types/SoloProjectTypes';
import {
  SiAirtable,
  SiGithub,
} from '@icons-pack/react-simple-icons';
import { createColumnHelper } from '@tanstack/table-core';
import {
  ExternalLink,
  Globe,
  Image,
  NotebookText,
} from 'lucide-react';

const columnHelper =
  createColumnHelper<SoloProjectSubmission>();

export const tierMismatchColumnDef = (
  refreshRow: (
    id: string,
    newTier: SoloProjectTier
  ) => void,
  baseURL: string,
  isAdmin: boolean = false
) => [
  ...(isAdmin
    ? [
        columnHelper.display({
          id: 'Airtable Link',
          cell: ({ row }) => {
            return (
              <a
                href={`${baseURL}/${row.original.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <SiAirtable />
              </a>
            );
          },
        }),
      ]
    : []),
  columnHelper.accessor(
    (row) => row.fields['Discord Name'],
    {
      header: 'User',
      cell: ({ getValue, row }) => {
        return (
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <div className="font-bold mr-6">
                {getValue()}
              </div>
              <div className="text-gray-500">
                <div>
                  {row.original.fields['Evaluation Status']}
                </div>
                <div>{row.original.fields['Role']}</div>
              </div>
            </div>
          </div>
        );
      },
    }
  ),
  columnHelper.display({
    id: 'Links',
    cell: ({ row }) => {
      switch (row.original.fields['Role']) {
        case 'Developer':
        case 'Software Developer':
          return (
            <div className="flex gap-2 items-center">
              <TooltipWithLink
                Icon={ExternalLink}
                link={`/solo-project/${row.original.id}`}
                tooltip="Solo Project"
              />
              <TooltipWithLink
                Icon={SiGithub}
                link={urlLinkParser(
                  row.original.fields['GitHub Repo URL']
                )}
                tooltip="Github Repo URL"
              />
              <TooltipWithLink
                Icon={Globe}
                link={urlLinkParser(
                  row.original.fields['Deployed App URL']
                )}
                tooltip="Deployed App URL"
              />
            </div>
          );
        case 'UI/UX':
        case 'UI / UX Designer':
        case 'UI/UX Designer':
          return (
            <div className="flex gap-2 items-center">
              <TooltipWithLink
                Icon={ExternalLink}
                link={`/solo-project/${row.original.id}`}
                tooltip="Solo Project"
              />
              <TooltipWithLink
                Icon={Image}
                link={urlLinkParser(
                  row.original.fields['UI/UX Project URL']
                )}
                tooltip="UI/UX Project URL"
              />
            </div>
          );
        case 'Product Owner':
          return (
            <div className="flex gap-2 items-center">
              <TooltipWithLink
                Icon={ExternalLink}
                link={`/solo-project/${row.original.id}`}
                tooltip="Solo Project"
              />
              <TooltipWithLink
                Icon={NotebookText}
                link={urlLinkParser(
                  row.original.fields[
                    'PO Product Backlog URL'
                  ]
                )}
                tooltip="PO Product Backlog URL"
              />
            </div>
          );
        case 'Scrum Master':
          return (
            <div className="flex gap-2 items-center">
              <TooltipWithLink
                Icon={ExternalLink}
                link={`/solo-project/${row.original.id}`}
                tooltip="Solo Project"
              />
            </div>
          );
        default:
          return <div>Invalid Role</div>;
      }
    },
    // row.original.fields['Role'] === 'Developer' ? (
    //   <div className="flex gap-2 items-center">
    //     <TooltipWithLink
    //       Icon={ExternalLink}
    //       link={`/solo-project/${row.original.id}`}
    //       tooltip="Solo Project"
    //     />
    //     <TooltipWithLink
    //       Icon={SiGithub}
    //       link={urlLinkParser(
    //         row.original.fields['GitHub Repo URL']
    //       )}
    //       tooltip="Github Repo URL"
    //     />
    //     <TooltipWithLink
    //       Icon={LinkIcon}
    //       link={urlLinkParser(
    //         row.original.fields['Deployed App URL']
    //       )}
    //       tooltip="Deployed App URL"
    //     />
    //   </div>
    // )
    //   : row.original.fields['Role'] === 'UI/UX'||
    //     row.original.fields['Role'] === 'UI / UX Designer' ||
    //     row.original.fields['Role'] === 'UI/UX Designer'
    //     ?
    //     (
    //
    //     )
    //     :
  }),
  columnHelper.accessor((row) => row.fields['Tier'], {
    id: 'Tier',
    header: 'Suggested Tier',
  }),
  columnHelper.display({
    id: 'Action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <SetTierBtn
          soloProjectId={row.original.id}
          tier={row.original.fields.Tier}
          onSuccess={(newTier) =>
            refreshRow(row.original.id, newTier)
          }
        >
          Accept
        </SetTierBtn>
      );
    },
  }),
  columnHelper.display({
    id: 'SetTier',
    header: 'Set Tier',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {[1, 2, 3].map((tier) => (
            <SetTierBtn
              key={tier}
              soloProjectId={row.original.id}
              tier={tier.toString()}
              onSuccess={(newTier) =>
                refreshRow(row.original.id, newTier)
              }
            >
              {tier}
            </SetTierBtn>
          ))}
        </div>
      );
    },
  }),
];
