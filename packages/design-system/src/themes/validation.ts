import { Theme } from '@mui/material';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

// Extend colord with the a11y plugin
extend([a11yPlugin]);

export function getContrastRatio(color1: string, color2: string): number {
  const c1 = colord(color1);
  const c2 = colord(color2);
  return c1.contrast(c2);
}

export function validateThemeColors(theme: Theme): boolean {
  const { primary, background, text } = theme.palette;

  // Check contrast ratios against WCAG standards
  const textContrast = getContrastRatio(text.primary, background.default);
  const primaryContrast = getContrastRatio(primary.main, background.default);

  // WCAG AA standards: 4.5:1 for normal text, 3:1 for large text
  return textContrast >= 4.5 && primaryContrast >= 3.0;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
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
