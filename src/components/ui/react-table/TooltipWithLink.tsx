import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { ComponentType } from 'react';

// Tooltip with link text or icon
const TooltipWithLink = ({
  link,
  linkText,
  tooltip,
  Icon,
  openInNewTab = true,
}: {
  link: string | null | undefined;
  tooltip: string;
  openInNewTab?: boolean;
} & (
  | { linkText: string; Icon?: ComponentType }
  | { linkText?: string; Icon: ComponentType }
)) => {
  if (!link) return;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={link}
          target={openInNewTab ? '_blank' : '_self'}
          rel="noopener noreferrer"
        >
          {linkText}
          {Icon && <Icon />}
        </Link>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWithLink;
