import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../../../theme';
import { Card } from '../index';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={getTheme('finance')}>{ui}</ThemeProvider>
  );
};

describe('Card Component', () => {
  it('renders children content', () => {
    renderWithTheme(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    renderWithTheme(
      <Card title="Test Title" subtitle="Test Subtitle">
        <div>Content</div>
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    renderWithTheme(
      <Card
        title="With Icon"
        icon={<AccountCircleIcon data-testid="card-icon" />}
      >
        <div>Content</div>
      </Card>
    );
    expect(screen.getByTestId('card-icon')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    renderWithTheme(
      <Card>
        <div>Content</div>
      </Card>
    );
    const card = screen.getByRole('article');
    expect(card).toHaveClass('MuiCard-root');
  });

  it('renders with glass variant', () => {
    renderWithTheme(
      <Card variant="glass">
        <div>Content</div>
      </Card>
    );
    const card = screen.getByRole('article');
    // Glass variant should have a semi-transparent background
    expect(card).toHaveStyle({ backgroundColor: 'rgba(255, 255, 255, 0.8)' });
  });

  it('renders with outlined variant', () => {
    renderWithTheme(
      <Card variant="outlined">
        <div>Content</div>
      </Card>
    );
    const card = screen.getByRole('article');
    expect(card).toHaveClass('MuiCard-root');
  });

  it('applies custom className', () => {
    const customClass = 'custom-card';
    renderWithTheme(
      <Card className={customClass}>
        <div>Content</div>
      </Card>
    );
    const card = screen.getByRole('article');
    expect(card).toHaveClass(customClass);
  });
});
