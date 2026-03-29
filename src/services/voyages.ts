'use server';

import {
  createOrFilter,
  transformVoyageSignupRecords,
  voyageSignupTable,
} from '@/lib/airtable';
import { ActionResponse } from '@/types';
import {
  VoyageSignup,
  VoyageSignupSearchableFields,
  VoyageSignupTeamNameType,
} from '@/types/VoyageSignupTypes';

export const getLastestVoyageSignups = async (): Promise<
  ActionResponse<VoyageSignup[]>
> => {
  try {
    const records = await voyageSignupTable
      .select({
        sort: [{ field: 'Timestamp', direction: 'desc' }],
        pageSize: 20,
      })
      .firstPage();

    return {
      success: true,
      message:
        'Successfully get latest voyage signup data.',
      data: transformVoyageSignupRecords(records),
    };
  } catch (e) {
    throw new Error(
      `Failed to get latest voyage signup data. Error: ${e}`
    );
  }
};

export const getVoyageSignupByVoyageNum = async (
  voyageNum: string
): Promise<ActionResponse<VoyageSignup[]>> => {
  try {
    const records = await voyageSignupTable
      .select({
        filterByFormula: `AND({Voyage} = "${voyageNum}", {Email} != "")`,
        sort: [
          {
            field: 'Timestamp',
            direction: 'desc',
          },
        ],
      })
      .all();

    return {
      success: true,
      message: `Successfully get voyage signup data for ${voyageNum}`,
      data: transformVoyageSignupRecords(records),
    };
  } catch (e) {
    throw new Error(
      `Failed to get voyage signup data for ${voyageNum}. Error: ${e}`
    );
  }
};

export const getTeamByVoyageNumAndTeamNum = async (
  voyageNum: number,
  teamNum: number
): Promise<ActionResponse<VoyageSignup[]>> => {
  try {
    const records = await voyageSignupTable
      .select({
        filterByFormula: `AND({Voyage} = "V${voyageNum}", {Team No.} = ${teamNum})`,
        sort: [
          {
            field: 'Timestamp',
            direction: 'desc',
          },
        ],
      })
      .all();

    return {
      success: true,
      message: `Successfully get voyage signup data for V${voyageNum} and Team No. ${teamNum}`,
      data: transformVoyageSignupRecords(records),
    };
  } catch (e) {
    throw new Error(
      `Failed to get voyage signup data for V${voyageNum} and Team No. ${teamNum}. Error: ${e}`
    );
  }
};

export const getAllVoyageSignupsByMember = async (
  discordId?: string,
  email?: string
): Promise<ActionResponse<VoyageSignup[]>> => {
  if (!discordId && !email) {
    return {
      success: false,
      message:
        'Either discordId or email must be provided.',
    };
  }

  try {
    const conditions: {
      field: VoyageSignupSearchableFields;
      value: string;
    }[] = [];

    if (discordId) {
      conditions.push({
        field: 'Discord ID',
        value: discordId,
      });
    }
    if (email) {
      conditions.push({ field: 'Email', value: email });
    }

    const filter = createOrFilter(conditions);

    const records = await voyageSignupTable
      .select({
        filterByFormula: filter,
      })
      .all();

    return {
      success: true,
      data: transformVoyageSignupRecords(records),
      message: 'Successfully get voyage signup data.',
    };
  } catch (e) {
    throw new Error(
      `Failed to get voyage signup data. Error: ${e}`
    );
  }
};

export const updateVoyageSignupTierByRecordId = async (
  recordId: string,
  newTier: VoyageSignupTeamNameType
) => {
  try {
    const updatedRecord = await voyageSignupTable.update([
      {
        id: recordId,
        fields: {
          'Team Name': newTier,
        },
      },
    ]);
    return {
      success: true,
      message: `Successfully update tier for ${recordId}.`,
      data: transformVoyageSignupRecords(updatedRecord)[0],
    };
  } catch (e) {
    throw new Error(`Failed to update tier. Error: ${e}`);
  }
};
