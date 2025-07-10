import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import { themes } from '../src/themes';
import { useGlobals } from '@storybook/preview-api';

type ThemeDecoratorProps = {
  children: ReactNode;
};

export const ThemeDecorator = ({ children }: ThemeDecoratorProps) => {
  const [{ theme }] = useGlobals();
  const themeKey = (theme || 'finance') as keyof typeof themes;
  const selectedTheme = themes[themeKey] || themes.finance;

  return (
    <ThemeProvider theme={selectedTheme}>
      {children}
    </ThemeProvider>
  );
};
