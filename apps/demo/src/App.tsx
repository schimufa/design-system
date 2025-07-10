import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Typography, CssBaseline } from '@mui/material';
import { Button, getTheme, themes, AppTheme } from '@ab-inbev/design-system';

function App() {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('finance');
  const [buttonVersion, setButtonVersion] = useState<'1.0.0' | '2.0.0'>('1.0.0');

  return (
    <ThemeProvider theme={getTheme(currentTheme)}>
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
              {themes.map((theme) => (
                <Grid item key={theme}>
                  <Button
                    variant={currentTheme === theme ? 'contained' : 'outlined'}
                    onClick={() => setCurrentTheme(theme)}
                  >
                    {theme}
                  </Button>
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
                <Button
                  variant={buttonVersion === '1.0.0' ? 'contained' : 'outlined'}
                  onClick={() => setButtonVersion('1.0.0')}
                >
                  Version 1.0.0
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={buttonVersion === '2.0.0' ? 'contained' : 'outlined'}
                  onClick={() => setButtonVersion('2.0.0')}
                >
                  Version 2.0.0
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              3. Component Demo (Version: {buttonVersion})
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button version={buttonVersion} variant="contained">
                  Primary Button
                </Button>
              </Grid>
              <Grid item>
                <Button version={buttonVersion} variant="outlined">
                  Secondary Button
                </Button>
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