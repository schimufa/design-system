import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes } from '../src/themes';
import { useGlobals } from '@storybook/preview-api';

export const ThemeDecorator = (Story: any) => {
  const [{ theme }] = useGlobals();
  const selectedTheme = themes[theme || 'finance'] || themes.finance;

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
}; 