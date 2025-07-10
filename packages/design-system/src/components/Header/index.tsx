import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';

export interface HeaderProps {
  /**
   * The title to display in the header
   */
  title: string;
  /**
   * Optional logo element to display on the left
   */
  logo?: React.ReactNode;
  /**
   * Optional actions to display on the right
   */
  actions?: React.ReactNode;
  /**
   * Optional className for additional styling
   */
  className?: string;
}

/**
 * Header component that provides a consistent navigation bar across applications
 */
export const Header: React.FC<HeaderProps> = ({ 
  title, 
  logo, 
  actions,
  className 
}) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      className={className}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }}
    >
      <Toolbar>
        {logo && (
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {logo}
          </Box>
        )}
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {actions && (
          <Box sx={{ ml: 2 }}>
            {actions}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}; 