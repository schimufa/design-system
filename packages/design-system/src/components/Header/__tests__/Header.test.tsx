import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../../../theme';
import { Header } from '../index';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={getTheme('finance')}>
      {ui}
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  it('renders title', () => {
    renderWithTheme(
      <Header title="Test Header" />
    );
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders with logo', () => {
    renderWithTheme(
      <Header 
        title="With Logo"
        logo={<AccountCircleIcon data-testid="header-logo" />}
      />
    );
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });

  it('renders with actions', () => {
    const actionText = 'Action Button';
    renderWithTheme(
      <Header 
        title="With Actions"
        actions={<Button>{actionText}</Button>}
      />
    );
    expect(screen.getByText(actionText)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-header';
    renderWithTheme(
      <Header 
        title="Custom Class"
        className={customClass}
      />
    );
    expect(screen.getByRole('banner')).toHaveClass(customClass);
  });

  it('renders all elements in correct layout', () => {
    renderWithTheme(
      <Header 
        title="Full Header"
        logo={<AccountCircleIcon data-testid="header-logo" />}
        actions={<Button data-testid="header-action">Action</Button>}
      />
    );
    
    const header = screen.getByRole('banner');
    const logo = screen.getByTestId('header-logo');
    const title = screen.getByText('Full Header');
    const action = screen.getByTestId('header-action');

    expect(header).toContainElement(logo);
    expect(header).toContainElement(title);
    expect(header).toContainElement(action);
  });
}); 