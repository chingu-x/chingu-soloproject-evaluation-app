import AirtableLinkButton from '@/components/ui/navigation/AirtableLinkButton';
import BackButton from '@/components/ui/navigation/BackButton';
import H1 from '@/components/ui/typography/h1';
import SingleVoyageSignupTable from '@/components/voyages/signups/SingleVoyageSignupTable';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { getVoyageSignupByVoyageNum } from '@/services/voyages';
import { z } from 'zod';

const paramsSchema = z.object({
  voyageNum: z.string().regex(/^[XV]\d{2}$/, {
    message:
      'Voyage must start with X or V and be followed by 2 digits',
  }),
});

const SingleVoyageSignupPage = async ({
  params,
}: {
  params: Promise<{ voyageNum: string }>;
}) => {
  const parsedParams = paramsSchema.parse(await params);

  const signups = await getVoyageSignupByVoyageNum(
    parsedParams.voyageNum
  );

  if (!signups.success) {
    return <div>Error fetching signups</div>;
  }

  return (
    <div>
      <BackButton
        path="/admin/voyage/schedule"
        label="Back to Voyages"
      />
      <AirtableLinkButton
        path={getATBaseURL('voyage-signup')}
        label="Go to airtable"
      />
      <H1>Voyage {parsedParams.voyageNum} Signups</H1>
      <SingleVoyageSignupTable
        records={signups.data}
        atBaseUrl={getATBaseURL('voyage-signup')}
      />
    </div>
  );
};

export default SingleVoyageSignupPage;
