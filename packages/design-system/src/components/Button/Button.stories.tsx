import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { Button } from './index';
import { themes } from '../../themes';
import { getDesignSpec, getFigmaUrl } from '../../design-specs';

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

// Version comparison examples
export const VersionComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div>
        <h3>Button v1.0.0 (Legacy)</h3>
        <p>Sharp corners, uppercase text</p>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button version="1.0.0" variant="contained">
            Version 1.0.0
          </Button>
          <Button version="1.0.0" variant="outlined">
            Version 1.0.0
          </Button>
          <Button version="1.0.0" variant="text">
            Version 1.0.0
          </Button>
        </div>
        <small>
          Design:{' '}
          <a
            href={getFigmaUrl('Button', '1.0.0')}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Figma
          </a>
        </small>
      </div>

      <div>
        <h3>Button v2.0.0 (Current)</h3>
        <p>Rounded corners, normal text case</p>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button version="2.0.0" variant="contained">
            Version 2.0.0
          </Button>
          <Button version="2.0.0" variant="outlined">
            Version 2.0.0
          </Button>
          <Button version="2.0.0" variant="text">
            Version 2.0.0
          </Button>
        </div>
        <small>
          Design:{' '}
          <a
            href={getFigmaUrl('Button', '2.0.0')}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Figma
          </a>
        </small>
      </div>
    </div>
  ),
};

// Migration example
export const MigrationExample: Story = {
  render: () => {
    const v2Spec = getDesignSpec('Button', '2.0.0');

    return (
      <div style={{ maxWidth: '800px' }}>
        <h3>Migration from v1.0.0 to v2.0.0</h3>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h4>Before (v1.0.0)</h4>
            <Button version="1.0.0" variant="contained">
              Old Button
            </Button>
          </div>
          <div>
            <h4>After (v2.0.0)</h4>
            <Button version="2.0.0" variant="contained">
              New Button
            </Button>
          </div>
        </div>

        {v2Spec?.breakingChanges && (
          <div
            style={{
              background: '#fff3cd',
              padding: '1rem',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
          >
            <h4>⚠️ Breaking Changes:</h4>
            <ul>
              {v2Spec.breakingChanges.map((change, index) => (
                <li key={index}>{change}</li>
              ))}
            </ul>
          </div>
        )}

        {v2Spec?.migrationGuide && (
          <div
            style={{
              background: '#d1ecf1',
              padding: '1rem',
              borderRadius: '4px',
            }}
          >
            <h4>📋 Migration Guide:</h4>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9em' }}>
              {v2Spec.migrationGuide}
            </pre>
          </div>
        )}
      </div>
    );
  },
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
