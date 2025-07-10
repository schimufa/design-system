import { Theme } from '@mui/material';
import { colord } from 'colord';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

interface ContrastRequirement {
  ratio: number;
  level: 'AA' | 'AAA';
}

const WCAG_REQUIREMENTS: Record<string, ContrastRequirement> = {
  normalText: { ratio: 4.5, level: 'AA' },
  largeText: { ratio: 3.0, level: 'AA' },
  normalTextAAA: { ratio: 7.0, level: 'AAA' },
  largeTextAAA: { ratio: 4.5, level: 'AAA' },
};

function checkColorContrast(color1: string, color2: string): number {
  return colord(color1).contrast(color2);
}

function validateColorPalette(theme: Theme): string[] {
  const errors: string[] = [];
  const { primary, secondary, error, background, text } = theme.palette;

  // Check primary color contrast
  const primaryContrast = checkColorContrast(primary.main, background.default);
  if (primaryContrast < WCAG_REQUIREMENTS.normalText.ratio) {
    errors.push(
      `Primary color contrast ratio (${primaryContrast.toFixed(2)}) is below WCAG AA standard`
    );
  }

  // Check text color contrast
  const textContrast = checkColorContrast(text.primary, background.default);
  if (textContrast < WCAG_REQUIREMENTS.normalText.ratio) {
    errors.push(
      `Text color contrast ratio (${textContrast.toFixed(2)}) is below WCAG AA standard`
    );
  }

  return errors;
}

function validateTypography(theme: Theme): string[] {
  const errors: string[] = [];
  const { typography } = theme;

  // Check font sizes
  if (!typography.fontSize) {
    errors.push('Base font size is not defined');
  }

  // Check font families
  if (!typography.fontFamily) {
    errors.push('Font family is not defined');
  }

  return errors;
}

function validateSpacing(theme: Theme): string[] {
  const errors: string[] = [];
  const { spacing } = theme;

  // Check spacing function
  if (typeof spacing !== 'function') {
    errors.push('Spacing must be a function');
  }

  return errors;
}

function validateShape(theme: Theme): string[] {
  const errors: string[] = [];
  const { shape } = theme;

  // Check border radius
  if (typeof shape.borderRadius !== 'number') {
    errors.push('Border radius must be a number');
  }

  return errors;
}

export function validateTheme(theme: Theme): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  // Collect all validation errors
  result.errors = [
    ...validateColorPalette(theme),
    ...validateTypography(theme),
    ...validateSpacing(theme),
    ...validateShape(theme),
  ];

  // Add warnings for best practices
  if (!theme.palette.mode) {
    result.warnings.push('Theme mode (light/dark) is not specified');
  }

  if (!theme.transitions) {
    result.warnings.push('Transitions are not defined');
  }

  // Set valid flag
  result.valid = result.errors.length === 0;

  return result;
}

export function validateThemeCompatibility(
  oldTheme: Theme,
  newTheme: Theme
): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  // Check for breaking changes in color palette
  if (oldTheme.palette.primary.main !== newTheme.palette.primary.main) {
    result.warnings.push(
      'Primary color has changed - verify component compatibility'
    );
  }

  // Check for breaking changes in typography
  if (oldTheme.typography.fontSize !== newTheme.typography.fontSize) {
    result.warnings.push(
      'Base font size has changed - verify layout stability'
    );
  }

  // Check for breaking changes in spacing
  if (oldTheme.spacing(1) !== newTheme.spacing(1)) {
    result.warnings.push('Spacing unit has changed - verify layout stability');
  }

  // Set valid flag
  result.valid = result.errors.length === 0;

  return result;
}
