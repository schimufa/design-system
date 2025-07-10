import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './index';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible card component that can be used to group related content.

## Usage

\`\`\`jsx
import { Card } from '@schimufa/design-system';

function MyComponent() {
  return (
    <Card title="My Card" subtitle="Some description">
      Content goes here
    </Card>
  );
}
\`\`\`

## Variants
- default: Standard card with shadow
- outlined: Card with border
- glass: Semi-transparent card with blur effect
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the card',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle or description',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'glass'],
      description: 'The variant of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    icon: {
      control: 'select',
      options: ['none', 'account', 'info', 'star'],
      mapping: {
        none: null,
        account: <AccountCircleIcon />,
        info: <InfoIcon />,
        star: <StarIcon />,
      },
      description: 'Optional icon to display',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default Card',
    subtitle: 'This is a basic card example',
    children: 'Card content goes here. You can add any React elements as children.',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Card with Icon',
    subtitle: 'This card includes an icon',
    icon: <AccountCircleIcon />,
    children: 'Icons help provide visual context to your content.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      <Card
        title="Default"
        subtitle="Standard card"
        variant="default"
      >
        Content
      </Card>
      <Card
        title="Outlined"
        subtitle="Border only"
        variant="outlined"
      >
        Content
      </Card>
      <Card
        title="Glass"
        subtitle="Blur effect"
        variant="glass"
      >
        Content
      </Card>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Card
      title="Complex Example"
      subtitle="Cards can contain any content"
      icon={<StarIcon />}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ margin: 0 }}>This is a paragraph of text.</p>
        <div style={{ 
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          This is a nested content block
        </div>
        <button style={{ alignSelf: 'flex-start' }}>
          A button
        </button>
      </div>
    </Card>
  ),
}; 