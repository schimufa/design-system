import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'glass';
  sx?: SxProps<Theme>;
}

export function Card(props: CardProps) {
  const {
    title,
    subtitle,
    children,
    icon,
    className,
    variant = 'default',
    sx,
  } = props;

  const theme = useTheme();

  const getCardStyles = () => {
    const baseStyles: SxProps<Theme> = {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '16px',
      overflow: 'hidden',
      border: 'none',
      boxShadow: 'none',
      ...sx,
    };

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        };
      case 'outlined':
        return {
          ...baseStyles,
          border: `1px solid ${theme.palette.divider}`,
        };
      default:
        return baseStyles;
    }
  };

  return (
    <MuiCard className={className} sx={getCardStyles()} role="article">
      <CardContent sx={{ p: 3 }}>
        {(title || icon) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: subtitle ? '4px' : '16px',
            }}
          >
            {icon && (
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                {icon}
              </div>
            )}
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
          </div>
        )}
        {subtitle && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              mb: 2,
              fontSize: '1rem',
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </CardContent>
    </MuiCard>
  );
}
