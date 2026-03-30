import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './Role';

const Component =
  (Module as any).default ?? (Module as any).Role;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'ReactTable/Cells/Role',
  component: Component as any,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    role: {
      control: 'select',
      options: [
        'Software Developer',
        'Developer',
        'UI / UX Designer',
        'UI/UX Designer',
        'Data Scientist',
        'Product Owner',
        'Scrum Master',
        'unknown',
      ],
      description: 'The role in the voyage',
    },
    status: {
      control: 'select',
      options: ['Active', 'Inactive'],
      description: 'The status of the user',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const SoftwareDeveloper: Story = {
  args: {
    role: 'Software Developer',
    status: 'Active',
  },
};

export const UIUXDesigner: Story = {
  args: {
    role: 'UI / UX Designer',
    status: 'Active',
  },
};

export const InactiveRole: Story = {
  args: {
    role: 'Software Developer',
    status: 'Inactive',
  },
};

export const ProductOwner: Story = {
  args: {
    role: 'Product Owner',
    status: 'Active',
  },
};
