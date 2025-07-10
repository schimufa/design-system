import type { Meta, StoryObj } from '@storybook/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import { Card } from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Default Card',
    subtitle: 'A simple card component',
    children: 'This is the card content',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Card with Icon',
    subtitle: 'Using Material Icons',
    icon: <AccountCircleIcon />,
    children: 'Card content with an icon',
  },
};

export const Glass: Story = {
  args: {
    title: 'Glass Card',
    subtitle: 'With glass effect',
    variant: 'glass',
    children: 'Content with glass effect background',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    subtitle: 'With outline style',
    variant: 'outlined',
    children: 'Content in an outlined card',
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Card content'
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card title="Default" variant="default">Default variant</Card>
      <Card title="Glass" variant="glass">Glass variant</Card>
      <Card title="Outlined" variant="outlined">Outlined variant</Card>
    </div>
  ),
};

export const ComplexContent: Story = {
  args: {
    children: 'Complex content example'
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card
        title="Feature Card"
        subtitle="Important features"
        icon={<StarIcon />}
        variant="glass"
      >
        <div style={{ padding: '1rem' }}>
          <h3>Key Features</h3>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
      </Card>
      <Card
        title="Info Card"
        subtitle="Additional information"
        icon={<InfoIcon />}
        variant="outlined"
      >
        <div style={{ padding: '1rem' }}>
          <p>Detailed information about the component...</p>
        </div>
      </Card>
    </div>
  ),
}; 