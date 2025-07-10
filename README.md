# Frontend Design System

This repository demonstrates a modern, scalable frontend architecture with a unified design system and component library.

## Key Features

### 1. Configurable Design System

- Multiple color palettes for different application domains
- Theme switching without component logic changes
- Built on Material-UI for robust theming support
- Storybook integration for component development and documentation

### 2. Version-Controlled Components

- Components maintain version history through explicit versioning
- Documentation of changes in component comments
- Semantic versioning for clear upgrade paths
- Changesets for version management

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
pnpm install
```

2. Start the development environment:

```bash
pnpm dev
```

3. Build all packages:

```bash
pnpm build
```

4. Run Storybook:

````bash
# Navigate to the design system package
cd packages/design-system
pnpm storybook


## Development Workflow

1. Component Development:
   - Components are created in `packages/design-system`
   - Version changes are documented using changesets (`pnpm changeset`)
   - Changes are tracked through semantic versioning
   - Components are developed and documented in Storybook

2. Application Development:
   - Create new apps in the `apps` directory
   - Import components from `@schimufa/design-system`
   - Select appropriate component versions and themes

3. Testing Changes:
   - Run tests: `pnpm test`
   - Check linting: `pnpm lint`
   - Format code: `pnpm format`

## Release Process

1. Create changesets for your changes:
   ```bash
   pnpm changeset
````

2. Commit your changes and changeset files
3. When ready to release, run:
   ```bash
   pnpm changeset version
   pnpm install
   git add .
   git commit -m "Version packages"
   ```
4. Push changes to trigger the release workflow

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

Private - Internal Use Only
