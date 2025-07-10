import { createTheme } from '@mui/material/styles';

export type AppTheme = 'finance' | 'logistics' | 'sales';

const baseTheme = {
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
};

const themeConfigs: Record<AppTheme, any> = {
  finance: {
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#9c27b0',
        light: '#ba68c8',
        dark: '#7b1fa2',
      },
    },
  },
  logistics: {
    palette: {
      primary: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      secondary: {
        main: '#f57c00',
        light: '#ff9800',
        dark: '#e65100',
      },
    },
  },
  sales: {
    palette: {
      primary: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
      },
      secondary: {
        main: '#0288d1',
        light: '#29b6f6',
        dark: '#01579b',
      },
    },
  },
};

export const getTheme = (appTheme: AppTheme) => {
  return createTheme({
    ...baseTheme,
    ...themeConfigs[appTheme],
  });
};

export const themes = Object.keys(themeConfigs) as AppTheme[];
