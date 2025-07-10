import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions, Typography, useTheme } from '@mui/material';

export interface CardProps {
  /**
   * The title of the card
   */
  title?: string;
  /**
   * The subtitle of the card
   */
  subtitle?: string;
  /**
   * The main content of the card
   */
  children: React.ReactNode;
  /**
   * Optional actions to display at the bottom of the card
   */
  actions?: React.ReactNode;
  /**
   * Optional className for additional styling
   */
  className?: string;
  /**
   * Optional elevation level (0-24)
   */
  elevation?: number;
}

/**
 * Card component that provides a consistent container for content with optional header and actions
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  className,
  elevation = 1
}) => {
  const theme = useTheme();

  return (
    <MuiCard 
      className={className}
      elevation={elevation}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius
      }}
    >
      {(title || subtitle) && (
        <CardHeader
          title={title && (
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          )}
          subheader={subtitle && (
            <Typography variant="subtitle2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
      {actions && (
        <CardActions>
          {actions}
        </CardActions>
      )}
    </MuiCard>
  );
}; 