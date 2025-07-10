import { themes, getTheme } from '../src/themes';
import type { AppTheme } from '../src/themes';

const themeNames = Object.keys(themes) as AppTheme[];
const results = themeNames.map((themeName: AppTheme) => {
  const theme = getTheme(themeName);
  return {
    name: themeName,
    theme,
  };
});

console.log('Available themes:', results.map((r) => r.name).join(', '));
console.log('Theme validation complete!');
