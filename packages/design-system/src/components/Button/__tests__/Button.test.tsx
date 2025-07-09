import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../../../theme';
import Button from '../index';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={getTheme('finance')}>
      {ui}
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  it('renders with default version', () => {
    renderWithTheme(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders with version 1.0.0', () => {
    renderWithTheme(<Button version="1.0.0">Version 1</Button>);
    expect(screen.getByText('Version 1')).toBeInTheDocument();
  });

  it('renders with version 2.0.0', () => {
    renderWithTheme(<Button version="2.0.0">Version 2</Button>);
    expect(screen.getByText('Version 2')).toBeInTheDocument();
  });

  it('applies correct styling for version 1.0.0', () => {
    renderWithTheme(<Button version="1.0.0">Test</Button>);
    const button = screen.getByText('Test');
    expect(button).toHaveStyle('text-transform: uppercase');
  });

  it('applies correct styling for version 2.0.0', () => {
    renderWithTheme(<Button version="2.0.0">Test</Button>);
    const button = screen.getByText('Test');
    expect(button).toHaveStyle('text-transform: none');
  });
}); 