import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  useTheme,
  SxProps,
  Theme,
} from '@mui/material';
import {
  validateVersion,
  logVersionWarning,
  ComponentVersion,
} from '../../utils/version-manager';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'glass';
  version?: ComponentVersion;
  sx?: SxProps<Theme>;
}

/**
 * @version 1.0.0 - Initial card with rounded corners and modern styling
 * @version 2.0.0 - Enhanced card with improved spacing and typography
 */
export function Card(props: CardProps) {
  const {
    title,
    subtitle,
    children,
    icon,
    className,
    variant = 'default',
    version,
    sx,
  } = props;

  const validatedVersion = validateVersion('Card', version);

  // Log development warnings
  logVersionWarning('Card', validatedVersion);

  const theme = useTheme();

  const getCardStyles = () => {
    // Version-specific base styles
    const versionStyles =
      validatedVersion === '2.0.0'
        ? {
            borderRadius: '12px',
            padding: '1.5rem',
          }
        : {
            borderRadius: '16px',
            padding: '1rem',
          };

    const baseStyles: SxProps<Theme> = {
      backgroundColor: theme.palette.background.paper,
      overflow: 'hidden',
      border: 'none',
      boxShadow: 'none',
      ...versionStyles,
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

  const getContentPadding = () => {
    return validatedVersion === '2.0.0' ? { p: 2 } : { p: 3 };
  };

  return (
    <MuiCard className={className} sx={getCardStyles()} role="article">
      <CardContent sx={getContentPadding()}>
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
