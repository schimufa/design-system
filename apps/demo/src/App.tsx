import { Typography, CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Card, Button, getTheme, type AppTheme } from '@schimufa/design-system';

function App() {
  const themeKey: AppTheme = 'logistics';
  const theme = getTheme(themeKey);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          p: 4
        }}
      >
        {/* Header Section */}
        <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}>
          <Card variant="glass">
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography component="h1" variant="h4" gutterBottom>
                AB InBev Design System - {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} Theme
              </Typography>
              <Typography
                component="h2"
                variant="subtitle1"
                color="text.secondary"
              >
                Configurable • Scalable • Production Ready
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* Features Grid */}
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4
          }}>
            {/* Theme Demo Card */}
            <Card
              variant="default"
              title="Theme System"
              subtitle="Dynamic color palettes Business unit alignment"
            >
              <Box sx={{ mt: 3, space: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mr: 2, mb: 2 }}
                >
                  Primary Action
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  sx={{ mr: 2, mb: 2 }}
                >
                  Secondary
                </Button>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Current theme: <strong>{themeKey}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Primary: {theme.palette.primary.main}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Secondary: {theme.palette.secondary.main}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Components Card */}
            <Card
              variant="default"
              title="Components"
              subtitle="Consistent elements Reusable patterns"
            >
              <Box sx={{ mt: 3 }}>
                <Box sx={{ 
                  bgcolor: theme.palette.grey[100], 
                  borderRadius: theme.shape.borderRadius / 4, 
                  p: 2, 
                  mb: 2 
                }}>
                  <Box sx={{ 
                    bgcolor: 'background.paper', 
                    borderRadius: theme.shape.borderRadius / 4, 
                    p: 2, 
                    border: 1, 
                    borderColor: 'divider' 
                  }}>
                    <Typography variant="body2">Input field</Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  bgcolor: theme.palette.grey[100], 
                  borderRadius: theme.shape.borderRadius / 4, 
                  p: 2 
                }}>
                  <Box sx={{ 
                    bgcolor: 'background.paper', 
                    borderRadius: theme.shape.borderRadius / 4, 
                    p: 2, 
                    border: 1, 
                    borderColor: 'divider' 
                  }}>
                    <Typography variant="body2">Card component</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Clean layout structure
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Colors Card */}
            <Card
              variant="default"
              title="Colors"
              subtitle="Theme-aware palette Accessible contrast"
            >
              <Box sx={{ mt: 3 }}>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: 1, 
                  mb: 2 
                }}>
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.primary.main 
                  }} />
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.secondary.main 
                  }} />
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.error.main 
                  }} />
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.warning.main 
                  }} />
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.info.main 
                  }} />
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.success.main 
                  }} />
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.grey[500] 
                  }} />
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.grey[200] 
                  }} />
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      bgcolor: theme.palette.success.main, 
                      color: theme.palette.success.contrastText, 
                      px: 2, 
                      py: 0.5, 
                      borderRadius: theme.shape.borderRadius 
                    }}
                  >
                    Success
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      bgcolor: theme.palette.warning.main, 
                      color: theme.palette.warning.contrastText, 
                      px: 2, 
                      py: 0.5, 
                      borderRadius: theme.shape.borderRadius 
                    }}
                  >
                    Warning
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
          
          {/* Theme Demo Section */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom color="white">
              Design System Button Demo - Current Theme: {themeKey.toUpperCase()}
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary" version="1.0.0">
                Primary v1.0.0
              </Button>
              <Button variant="contained" color="primary" version="2.0.0">
                Primary v2.0.0
              </Button>
              <Button variant="outlined" color="secondary" version="1.0.0">
                Secondary v1.0.0
              </Button>
              <Button variant="outlined" color="secondary" version="2.0.0">
                Secondary v2.0.0
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
