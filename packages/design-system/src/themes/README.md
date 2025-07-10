# Theme System Documentation

## Overview
Our theme system provides a flexible way to customize the visual appearance of components across different applications while maintaining consistency in behavior and accessibility.

## Available Themes
- `finance`: Optimized for financial applications
- `logistics`: Designed for logistics and operations
- `sales`: Tailored for sales and marketing applications

## Theme Structure
Each theme includes:
- Color palette
- Typography
- Spacing
- Shape (border radius, etc.)
- Shadows
- Transitions

## Usage

### Basic Theme Implementation
```tsx
import { ThemeProvider } from '@mui/material';
import { themes } from '@schimufa/design-system';

function App() {
  return (
    <ThemeProvider theme={themes.finance}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Dynamic Theme Switching
```tsx
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themes } from '@schimufa/design-system';

function App() {
  const [currentTheme, setCurrentTheme] = useState('finance');

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <ThemeSelector onChange={setCurrentTheme} value={currentTheme} />
      <YourApp />
    </ThemeProvider>
  );
}
```

## Theme Customization

### Extending Existing Themes
```tsx
import { createTheme } from '@mui/material';
import { themes } from '@schimufa/design-system';

const customTheme = createTheme({
  ...themes.finance,
  palette: {
    ...themes.finance.palette,
    primary: {
      main: '#custom-color',
    },
  },
});
```

### Creating New Themes
```tsx
import { createTheme } from '@mui/material';
import { baseTheme } from '@schimufa/design-system';

const newTheme = createTheme({
  ...baseTheme,
  palette: {
    primary: { main: '#your-primary-color' },
    secondary: { main: '#your-secondary-color' },
  },
});
```

## Theme Properties

### Color Palette
Each theme includes:
- Primary color
- Secondary color
- Error/Warning/Info/Success states
- Background colors
- Text colors

### Typography
- Font families
- Font sizes
- Font weights
- Line heights
- Letter spacing

### Spacing
- Base unit: 8px
- Spacing helpers: theme.spacing(1) = 8px
- Consistent spacing scale

### Shape
- Border radius
- Component-specific shapes
- Consistent rounding

### Best Practices
1. Always use theme values instead of hard-coded values
2. Test components with all available themes
3. Ensure sufficient contrast ratios for accessibility
4. Use semantic color tokens (e.g., primary.main) instead of specific colors
5. Consider dark mode support when creating themes

## Migration Guide
When upgrading themes:
1. Review breaking changes in release notes
2. Test components with all themes
3. Update custom theme extensions
4. Verify accessibility compliance
5. Update documentation

## Theme Validation
Use our theme validation tools:
```tsx
import { validateTheme } from '@schimufa/design-system';

const isValid = validateTheme(customTheme);
```

## Contributing
1. Follow naming conventions
2. Document all theme tokens
3. Include usage examples
4. Test with all components
5. Verify accessibility
6. Update documentation 