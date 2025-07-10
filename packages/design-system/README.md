# AB InBev Design System

A configurable and version-controlled design system for AB InBev applications.

## Features

- 🎨 Configurable themes (Finance, Logistics, Sales)
- 📦 Version-controlled components
- 🔧 Built with React & Material-UI
- 📱 Responsive and accessible components
- 🧪 Fully tested components

## Installation

```bash
npm install @ab-inbev/design-system
```

## Quick Start

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { Button, getTheme } from '@ab-inbev/design-system';

function App() {
  return (
    <ThemeProvider theme={getTheme('finance')}>
      <Button version="1.0.0" variant="contained">
        Hello AB InBev!
      </Button>
    </ThemeProvider>
  );
}
```

## Themes

The design system supports three themes:
- Finance
- Logistics
- Sales

```tsx
import { getTheme } from '@ab-inbev/design-system';

// Use with ThemeProvider
<ThemeProvider theme={getTheme('finance')}>
  {/* Your app content */}
</ThemeProvider>
```

## Component Versioning

Components support multiple versions that can coexist in the same application:

```tsx
// Version 1.0.0 (Classic style)
<Button version="1.0.0" variant="contained">Click me</Button>

// Version 2.0.0 (Modern style)
<Button version="2.0.0" variant="contained">Click me</Button>
```

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details. 