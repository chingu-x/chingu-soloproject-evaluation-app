import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { MemberDetailsType } from '@/types/MemberTypes';
import {
  SiDiscord,
  SiGithub,
} from '@icons-pack/react-simple-icons';
import { LinkIcon } from 'lucide-react';
import { ComponentType } from 'react';

/**
 * Processes and renders detailed information about a member, including attributes like email, Discord name, and Discord ID.
 *
 * @param {object} params - The parameter object.
 * @param {MemberDetailsType} params.memberDetails - The member details data containing applications, solo projects, and voyage signups.
 * Each of these entities may include attributes used for rendering member-specific details.
 *
 * @return {JSX.Element} A table displaying the extracted member attributes, with appropriate handling for attributes containing multiple values or missing data.
 */
const MemberDetails = ({
  memberDetails,
}: {
  memberDetails: MemberDetailsType;
}) => {
  /**
   * Extracts values from memberDetails
   * Multiple attributes accepted because they could be different for each entity, e.g. discordName and "discord name"
   *
   * @param {string[]} attributes - An array of attribute keys to search for. The keys are case-insensitive.
   * @returns {string[]} An array of unique, trimmed strings that match the specified attributes.
   */
  const getAttribute = (attributes: string[]): string[] => {
    const wanted = attributes.map((a) => a.toLowerCase());
    const results = new Set<string>();

    const add = (val: unknown) => {
      if (typeof val === 'string') {
        const v = val
          .replace(/^\s+/, (m) => '␠'.repeat(m.length))
          .replace(/\s+$/, (m) => '␠'.repeat(m.length));
        if (v) results.add(v);
      } else if (Array.isArray(val)) {
        for (const item of val) {
          if (typeof item === 'string') {
            const v = item.trim();
            if (v) results.add(v);
          }
        }
      }
    };

    const collectFromFields = (fields: unknown) => {
      if (!fields || typeof fields !== 'object') return;
      const rec = fields as Record<string, unknown>;
      for (const key of Object.keys(rec)) {
        if (wanted.includes(key.toLowerCase())) {
          add(rec[key]);
        }
      }
    };

    memberDetails.applications.forEach((r) =>
      collectFromFields((r as any).fields)
    );
    memberDetails.soloProjects.forEach((r) =>
      collectFromFields((r as any).fields)
    );
    memberDetails.voyageSignups.forEach((r) =>
      collectFromFields((r as any).fields)
    );

    return Array.from(results);
  };

  const renderAttribute = (
    label: string,
    candidates: string[],
    linkConfig?: {
      prefix: string;
      Icon?: ComponentType;
    } // Optional prefix for handles
  ) => {
    const values = getAttribute(candidates);
    const hasMultiple = values.length > 1;
    const Icon = linkConfig?.Icon
      ? linkConfig.Icon
      : LinkIcon;

    return (
      <TableRow key={label}>
        <TableCell className="font-bold font-xl">
          {label}
        </TableCell>
        <TableCell>
          {values.length === 0 ? (
            <span className="text-gray-500">
              Not available
            </span>
          ) : linkConfig ? (
            <div className="flex gap-4 items-center">
              <div>{values.join(', ')}</div>
              {hasMultiple && (
                <div className="text-amber-600 text-sm">
                  Note: Multiple values found for {label}.
                </div>
              )}
              <a
                href={`${linkConfig.prefix}${values[0]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div>{values.join(', ')}</div>
              {hasMultiple && (
                <div className="text-amber-600 text-sm">
                  Note: Multiple values found for {label}.
                </div>
              )}
            </div>
          )}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card className="max-w-[600px] mx-auto mt-8">
      <Table>
        <TableBody>
          {renderAttribute('Email', ['Email', 'email'])}
          {renderAttribute('Discord Name', [
            'Discord Name',
            'discord name',
          ])}
          {renderAttribute(
            'Discord ID',
            ['Discord ID', 'discord id', 'discordId'],
            {
              prefix: `discord://discordapp.com/users/`,
              Icon: SiDiscord,
            }
          )}
          {renderAttribute('Github ID', ['GitHub ID'], {
            prefix: `https://github.com/`,
            Icon: SiGithub,
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MemberDetails;
