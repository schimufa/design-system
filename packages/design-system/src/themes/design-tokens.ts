import { blue, green, orange, grey } from '@mui/material/colors';

// These tokens should match your Figma variables
export interface DesignToken<T> {
  value: T;
  description?: string;
  type: 'color' | 'spacing' | 'borderRadius' | 'typography';
  figmaVariable?: string; // Reference to Figma variable name
}

export interface DesignTokens {
  colors: {
    [key: string]: DesignToken<string>;
  };
  spacing: {
    [key: string]: DesignToken<number>;
  };
  borderRadius: {
    [key: string]: DesignToken<number>;
  };
  typography: {
    [key: string]: DesignToken<{
      fontFamily: string;
      fontSize: number;
      fontWeight: number;
      lineHeight: number;
    }>;
  };
}

export const designTokens: DesignTokens = {
  colors: {
    // Primary colors
    'primary.blue': {
      value: blue[500],
      type: 'color',
      description: 'Primary blue color for finance applications',
      figmaVariable: 'colors/primary/blue',
    },
    'primary.green': {
      value: green[500],
      type: 'color',
      description: 'Primary green color for sales applications',
      figmaVariable: 'colors/primary/green',
    },
    'primary.orange': {
      value: orange[500],
      type: 'color',
      description: 'Primary orange color for logistics applications',
      figmaVariable: 'colors/primary/orange',
    },
    // Background colors
    'background.light': {
      value: '#ffffff',
      type: 'color',
      description: 'Default background color for light mode',
      figmaVariable: 'colors/background/light',
    },
    'background.dark': {
      value: grey[900],
      type: 'color',
      description: 'Default background color for dark mode',
      figmaVariable: 'colors/background/dark',
    },
  },
  spacing: {
    xs: {
      value: 4,
      type: 'spacing',
      description: 'Extra small spacing',
      figmaVariable: 'spacing/xs',
    },
    sm: {
      value: 8,
      type: 'spacing',
      description: 'Small spacing',
      figmaVariable: 'spacing/sm',
    },
    md: {
      value: 16,
      type: 'spacing',
      description: 'Medium spacing',
      figmaVariable: 'spacing/md',
    },
    lg: {
      value: 24,
      type: 'spacing',
      description: 'Large spacing',
      figmaVariable: 'spacing/lg',
    },
    xl: {
      value: 32,
      type: 'spacing',
      description: 'Extra large spacing',
      figmaVariable: 'spacing/xl',
    },
  },
  borderRadius: {
    small: {
      value: 4,
      type: 'borderRadius',
      description: 'Small border radius',
      figmaVariable: 'borderRadius/small',
    },
    medium: {
      value: 8,
      type: 'borderRadius',
      description: 'Medium border radius',
      figmaVariable: 'borderRadius/medium',
    },
    large: {
      value: 16,
      type: 'borderRadius',
      description: 'Large border radius',
      figmaVariable: 'borderRadius/large',
    },
  },
  typography: {
    'body.regular': {
      value: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      type: 'typography',
      description: 'Regular body text',
      figmaVariable: 'typography/body/regular',
    },
    'heading.h1': {
      value: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      type: 'typography',
      description: 'Heading 1',
      figmaVariable: 'typography/heading/h1',
    },
  },
};
