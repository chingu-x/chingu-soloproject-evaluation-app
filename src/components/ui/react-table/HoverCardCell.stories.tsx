import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import {
  Info,
  MessageCircle,
  PanelTopOpen,
} from 'lucide-react';
import '../../../app/globals.css';
import * as Module from './HoverCardCell';

const Component =
  (Module as any).default ?? (Module as any).HoverCardCell;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'ReactTable/Cells/HoverCardCell',
  component: Component as any,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to show in the hover card',
    },
    Icon: {
      options: ['PanelTopOpen', 'Info', 'MessageCircle'],
      mapping: {
        PanelTopOpen,
        Info,
        MessageCircle,
      },
      control: {
        type: 'select',
        labels: {
          PanelTopOpen: 'Default (Panel)',
          Info: 'Info',
          MessageCircle: 'Message',
        },
      },
      description:
        'Optional icon to trigger the hover card',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    content:
      'This is some content that will appear in the hover card.',
  },
};

export const LongContent: Story = {
  args: {
    content:
      'This is a much longer piece of content.\n\nIt contains multiple lines\n\nTo test how the hover card handles overflow and whitespace.\n\n' +
      'a'.repeat(500),
  },
};

export const CustomIcon: Story = {
  args: {
    content: 'Information about this item.',
    Icon: 'Info',
  },
};
