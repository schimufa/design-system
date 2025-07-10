import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AppTheme, getTheme } from './index';

interface ThemeProviderProps {
  theme: AppTheme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const muiTheme = React.useMemo(() => getTheme(theme), [theme]);
  
  return (
    <MuiThemeProvider theme={muiTheme}>
      {children}
    </MuiThemeProvider>
  );
}; 