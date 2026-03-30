import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import {
  ExternalLink,
  Github,
  Info,
  Link2,
} from 'lucide-react';
import '../../../app/globals.css';
import TooltipWithLink from './TooltipWithLink';

const Component = TooltipWithLink;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'ReactTable/Cells/TooltipWithLink',
  component: Component as any,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    link: {
      control: 'text',
      description: 'The destination URL',
    },
    tooltip: {
      control: 'text',
      description: 'The tooltip text',
    },
    linkText: {
      control: 'text',
      description: 'The text to display for the link',
    },
    Icon: {
      options: [
        'None',
        'ExternalLink',
        'Link2',
        'Info',
        'Github',
      ],
      mapping: {
        None: null,
        ExternalLink,
        Link2,
        Info,
        Github,
      },
      control: {
        type: 'select',
        labels: {
          None: 'No Icon',
          ExternalLink: 'External Link',
          Link2: 'Link',
          Info: 'Info',
          Github: 'Github',
        },
      },
      description: `
    import { Info } from 'lucide-react'
    Icon={Info}
      `,
    },
    openInNewTab: {
      control: 'boolean',
      description: 'Whether the link is external',
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const TextOnly: Story = {
  args: {
    link: 'https://chingu.io',
    linkText: 'Visit Chingu',
    tooltip: 'Go to Chingu website',
  },
};

export const IconOnly: Story = {
  args: {
    link: 'https://chingu.io',
    Icon: ExternalLink,
    tooltip: 'Go to Chingu website',
  },
};

export const TextAndIcon: Story = {
  args: {
    link: 'https://chingu.io',
    linkText: 'Chingu',
    Icon: Link2,
    tooltip: 'Go to Chingu website',
  },
};

export const InternalLink: Story = {
  args: {
    link: '/dashboard',
    linkText: 'Dashboard',
    tooltip: 'Go to your dashboard',
    openInNewTab: false,
  },
};
