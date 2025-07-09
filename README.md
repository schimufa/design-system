# AB InBev Frontend Architecture Solution

This repository demonstrates a modern, scalable frontend architecture that meets AB InBev's requirements for a unified design system and component library. The solution addresses all 8 key requirements while maintaining simplicity and flexibility.

## Key Features

### 1. Configurable Design System
- Multiple color palettes for different application domains (finance, logistics, sales)
- Theme switching without component logic changes
- Built on Material-UI for robust theming support

### 2. Version-Controlled Components
- Components maintain version history through explicit versioning
- Documentation of changes in component comments
- Semantic versioning for clear upgrade paths

### 3. Version-Controlled Application Blueprints
- Demo app showcasing component versioning
- Clear connection between design changes and code
- Easy version switching for testing

### 4. Independent Library Versioning
- Semantic versioning implementation
- Support for multiple component versions
- Non-breaking upgrades through version coexistence

### 5. Repository Strategy
- Monorepo structure using Turborepo
- Separate packages for design system and apps
- Shared configuration and tooling

### 6. Collaboration and Contributions
- Standardized development environment
- Automated linting and formatting
- Clear component versioning system

### 7. Release Notes and Documentation
- Automated documentation generation
- Version-specific documentation
- Clear upgrade paths

### 8. Large-Scale Application Management
- Independent app maintenance
- Consistent UX across versions
- Unified design standards

## Project Structure

```
.
├── apps/
│   └── demo/              # Demo application
├── packages/
│   └── design-system/     # Shared component library
├── package.json           # Root package configuration
└── turbo.json            # Turborepo configuration
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development environment:
```bash
npm run dev
```

3. Build all packages:
```bash
npm run build
```

## Development Workflow

1. Component Development:
   - Components are created in `packages/design-system`
   - Version changes are documented in component comments
   - Changes are tracked through semantic versioning

2. Application Development:
   - Create new apps in the `apps` directory
   - Import components from `@ab-inbev/design-system`
   - Select appropriate component versions and themes

3. Testing Changes:
   - Run tests: `npm test`
   - Check linting: `npm run lint`
   - Format code: `npm run format`

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

Private - AB InBev Internal Use Only 