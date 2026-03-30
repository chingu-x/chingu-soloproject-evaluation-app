import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './AirtableLink';

const Component =
  (Module as any).default ??
  (Module as any).AirtableLinkCell;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'ReactTable/Cells/AirtableLink',
  component: Component as any,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    baseUrl: {
      control: 'text',
      description: 'The base URL for Airtable',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

const mockRow = {
  original: {
    id: 'rec123456789',
  },
} as any;

export const Default: Story = {
  args: {
    row: mockRow,
    baseUrl: 'https://airtable.com/app12345/tbl67890',
  },
};
