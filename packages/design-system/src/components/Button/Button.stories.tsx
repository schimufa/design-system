import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component that supports multiple versions and Material-UI features.

## Versions
- 1.0.0: Classic design with uppercase text and sharp corners
- 2.0.0: Modern design with normal text case and rounded corners

## Usage

\`\`\`jsx
import { Button } from '@schimufa/design-system';

// Classic version (1.0.0)
<Button variant="contained">CLICK ME</Button>

// Modern version (2.0.0)
<Button version="2.0.0" variant="contained">Click me</Button>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    version: {
      control: 'radio',
      options: ['1.0.0', '2.0.0'],
      description: 'The design version of the button',
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'The variant to use',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the button',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button will be disabled',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Classic: Story = {
  args: {
    children: 'CLASSIC BUTTON',
    version: '1.0.0',
    variant: 'contained',
    color: 'primary',
  },
};

export const Modern: Story = {
  args: {
    children: 'Modern Button',
    version: '2.0.0',
    variant: 'contained',
    color: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button color="primary" variant="contained">Primary</Button>
      <Button color="secondary" variant="contained">Secondary</Button>
      <Button color="error" variant="contained">Error</Button>
      <Button color="warning" variant="contained">Warning</Button>
      <Button color="info" variant="contained">Info</Button>
      <Button color="success" variant="contained">Success</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
}; 