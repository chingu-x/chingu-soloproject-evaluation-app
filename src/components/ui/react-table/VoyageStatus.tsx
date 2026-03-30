import { voyageStatusColors } from '@/styles/voyageStatus';

const ReactTableVoyageStatusCell = ({
  status,
}: {
  status: string;
}) => {
  if (!status) return null;

  return (
    <div className={voyageStatusColors[status]?.text || ''}>
      {status}
    </div>
  );
};

export default ReactTableVoyageStatusCell;
