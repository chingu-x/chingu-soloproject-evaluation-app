import { roleColors } from '@/styles/roles';
import { VoyageRole } from '@/types/SoloProjectTypes';

const ReactTableRoleCell = ({
  role,
  status = 'Active',
}: {
  role: VoyageRole;
  status?: string;
}) => {
  if (!role) return null;
  const classColor =
    status === 'Active'
      ? roleColors[role]?.text
      : 'text-gray-500';
  return <span className={classColor}>{role}</span>;
};

export default ReactTableRoleCell;
