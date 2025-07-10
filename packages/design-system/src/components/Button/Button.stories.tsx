import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { Button } from './index';
import { themes } from '../../themes';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable button component that supports multiple themes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Base button story
export const Primary: Story = {
  args: {
    variant: 'contained',
    children: 'Primary Button',
  },
};

// Theme examples
export const ThemeExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      {Object.entries(themes).map(([name, theme]) => (
        <ThemeProvider key={name} theme={theme}>
          <div>
            <h3>{name} Theme</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </div>
          </div>
        </ThemeProvider>
      ))}
    </div>
  ),
};

// Dark mode example
export const DarkMode: Story = {
  render: () => (
    <div style={{ padding: '2rem', background: '#1a1a1a' }}>
      <ThemeProvider
        theme={{
          ...themes.finance,
          palette: { ...themes.finance.palette, mode: 'dark' },
        }}
      >
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </div>
      </ThemeProvider>
    </div>
  ),
};

// Accessibility examples
export const AccessibilityExamples: Story = {
  render: () => (
    <div>
      {Object.entries(themes).map(([name, theme]) => (
        <ThemeProvider key={name} theme={theme}>
          <div style={{ marginBottom: '2rem' }}>
            <h3>{name} Theme - Accessibility</h3>
            <div
              style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
            >
              <Button variant="contained" aria-label="Primary action">
                With ARIA Label
              </Button>
              <Button variant="outlined" disabled>
                Disabled State
              </Button>
              <Button variant="contained" aria-busy="true">
                Loading State
              </Button>
            </div>
          </div>
        </ThemeProvider>
      ))}
    </div>
  ),
};
