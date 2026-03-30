// input: a field
// if empty, don't show anything
// if there's content, show an icon that user can hover over to see the content

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { PanelTopOpen } from 'lucide-react';
import { ComponentType } from 'react';

const HoverCardCell = ({
  content,
  Icon = PanelTopOpen,
}: {
  content: string;
  Icon?: ComponentType;
}) => {
  if (!content) return null;
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Icon />
      </HoverCardTrigger>
      <HoverCardContent className="w-[500px] max-w-[90vw] max-h-[50vh] overflow-y-auto whitespace-pre-wrap break-words">
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardCell;
