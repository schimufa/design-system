import { themes } from '../src/themes';
import { validateTheme } from '../src/themes/validation';

const results = Object.entries(themes).map(([name, theme]) => {
  console.log(`\nValidating theme: ${name}`);
  const validation = validateTheme(theme);

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
