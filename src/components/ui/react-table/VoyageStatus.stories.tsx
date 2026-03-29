import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './VoyageStatus';

const Component =
  (Module as any).default ?? (Module as any).VoyageStatus;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'ReactTable/Cells/VoyageStatus',
  component: Component as any,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: [
        'Dropped',
        'Inactive',
        'SkipVoyage',
        'Active',
      ],
      description: 'The status of the voyage',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Dropped: Story = {
  args: {
    status: 'Dropped',
  },
};

export const Inactive: Story = {
  args: {
    status: 'Inactive',
  },
};

export const SkipVoyage: Story = {
  args: {
    status: 'SkipVoyage',
  },
};

export const Active: Story = {
  args: {
    status: 'Active',
  },
};
