import { createTheme } from '@mui/material/styles';
import { blue, green, orange } from '@mui/material/colors';

const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
};

export const themes = {
  finance: createTheme({
    ...baseTheme,
    palette: {
      primary: blue,
      secondary: green,
      mode: 'light',
    },
  }),
  logistics: createTheme({
    ...baseTheme,
    palette: {
      primary: orange,
      secondary: blue,
      mode: 'light',
    },
    shape: {
      borderRadius: 8,
    },
  }),
  sales: createTheme({
    ...baseTheme,
    palette: {
      primary: green,
      secondary: orange,
      mode: 'light',
    },
    shape: {
      borderRadius: 16,
    },
  }),
};
