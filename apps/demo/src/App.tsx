import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme,
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button as MuiButton,
  CssBaseline 
} from '@mui/material';

// Simple theme configurations
const themes = {
  finance: createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#9c27b0' },
    },
  }),
  logistics: createTheme({
    palette: {
      primary: { main: '#2e7d32' },
      secondary: { main: '#f57c00' },
    },
  }),
  sales: createTheme({
    palette: {
      primary: { main: '#d32f2f' },
      secondary: { main: '#0288d1' },
    },
  }),
};

// Simple versioned button component
const VersionedButton: React.FC<{
  version?: '1.0.0' | '2.0.0';
  variant?: 'contained' | 'outlined';
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ version = '1.0.0', variant = 'contained', onClick, children }) => {
  const buttonStyle = {
    borderRadius: version === '2.0.0' ? '20px' : '4px',
    textTransform: version === '2.0.0' ? 'none' : 'uppercase',
  } as const;

  return (
    <MuiButton
      variant={variant}
      onClick={onClick}
      sx={buttonStyle}
    >
      {children}
    </MuiButton>
  );
};

function App() {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('finance');
  const [buttonVersion, setButtonVersion] = useState<'1.0.0' | '2.0.0'>('1.0.0');

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            🚀 AB InBev Frontend Demo
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Demonstrating configurable design system with version-controlled components
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              1. Theme Selection (Requirement #1: Configurable Design System)
            </Typography>
            <Grid container spacing={2}>
              {Object.keys(themes).map((theme) => (
                <Grid item key={theme}>
                  <VersionedButton
                    variant={currentTheme === theme ? 'contained' : 'outlined'}
                    onClick={() => setCurrentTheme(theme as keyof typeof themes)}
                  >
                    {theme}
                  </VersionedButton>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              2. Component Versioning (Requirement #2: Version-Controlled Components)
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <VersionedButton
                  variant={buttonVersion === '1.0.0' ? 'contained' : 'outlined'}
                  onClick={() => setButtonVersion('1.0.0')}
                >
                  Version 1.0.0
                </VersionedButton>
              </Grid>
              <Grid item>
                <VersionedButton
                  variant={buttonVersion === '2.0.0' ? 'contained' : 'outlined'}
                  onClick={() => setButtonVersion('2.0.0')}
                >
                  Version 2.0.0
                </VersionedButton>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              3. Component Demo (Version: {buttonVersion})
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <VersionedButton version={buttonVersion} variant="contained">
                  Primary Button
                </VersionedButton>
              </Grid>
              <Grid item>
                <VersionedButton version={buttonVersion} variant="outlined">
                  Secondary Button
                </VersionedButton>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              ✅ Requirements Demonstrated:
            </Typography>
            <Typography variant="body2" component="div">
              <ul>
                <li><strong>Configurable Design System:</strong> Switch between Finance, Logistics, and Sales themes</li>
                <li><strong>Version-Controlled Components:</strong> Button v1.0.0 vs v2.0.0 with visual differences</li>
                <li><strong>Independent Library Versioning:</strong> Components can coexist with different versions</li>
                <li><strong>Repository Strategy:</strong> Monorepo structure with shared components</li>
                <li><strong>Large-Scale Management:</strong> Consistent UX across theme changes</li>
              </ul>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Current Theme: <strong>{currentTheme}</strong> | Button Version: <strong>{buttonVersion}</strong>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 