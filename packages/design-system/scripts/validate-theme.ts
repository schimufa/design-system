import { themes, getTheme } from '../src/theme';

const results = themes.map((themeName) => {
  console.log(`\nValidating theme: ${themeName}`);
  const theme = getTheme(themeName);
  
  // Basic theme validation
  const validation = {
    errors: [] as string[],
    warnings: [] as string[],
    valid: true
  };

  // Validate required theme properties
  if (!theme.palette) {
    validation.errors.push('Missing palette configuration');
    validation.valid = false;
  }

  if (!theme.typography) {
    validation.errors.push('Missing typography configuration');
    validation.valid = false;
  }

  // Validate color schemes
  if (theme.palette) {
    if (!theme.palette.primary?.main) {
      validation.errors.push('Missing primary.main color');
      validation.valid = false;
    }
    if (!theme.palette.secondary?.main) {
      validation.errors.push('Missing secondary.main color');
      validation.valid = false;
    }
  }

  if (validation.errors.length > 0) {
    console.error('Errors:');
    validation.errors.forEach((error) => console.error(`- ${error}`));
  }

  if (validation.warnings.length > 0) {
    console.warn('Warnings:');
    validation.warnings.forEach((warning) => console.warn(`- ${warning}`));
  }

  if (validation.valid) {
    console.log('✓ Theme is valid');
  }

  return validation.valid;
});

const allValid = results.every(Boolean);
if (!allValid) {
  console.error('\n❌ Theme validation failed');
  process.exit(1);
}

console.log('\n✓ All themes are valid');
