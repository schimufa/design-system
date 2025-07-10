# @ab-inbev/design-system

## 3.0.0

### Major Changes

- New release

## 2.0.5

### Patch Changes

- Fixed build configuration and dependencies:
  - Added @emotion/react and @emotion/styled dependencies
  - Updated Vite configuration for proper external handling
  - Fixed TypeScript errors in theme validation
  - Improved Storybook configuration

## 3.0.0

### Major Changes

- 8f9ce8f: Major update with theme system improvements and documentation enhancements

  BREAKING CHANGES:
  - Theme system now uses Material-UI's createTheme function
  - Custom theme tokens replaced with MUI theme structure
  - Dark mode support added through palette.mode

  NEW FEATURES:
  - Theme validation system with accessibility checks
  - Comprehensive documentation and migration guides
  - Enhanced Storybook examples with theme demonstrations
  - Automated CI/CD pipeline with documentation deployment

  For detailed migration instructions, see the MIGRATION.md guide.

### Patch Changes

- Fixed TypeScript errors and improved theme validation:
  - Updated Storybook configuration and types
  - Fixed theme decorator implementation
  - Improved color contrast validation using colord
  - Added proper WCAG contrast ratio checks
  - Removed unused code and improved type safety

## 2.0.4

### Patch Changes

- Fixed build configuration:
  - Updated TypeScript configuration for proper module resolution
  - Fixed import extensions in demo app
  - Updated Vite configuration for better TypeScript support
  - Improved ESLint configuration

## 2.0.3

### Patch Changes

- Updated build configuration and fixed package exports for proper type generation.

## 2.0.2

### Patch Changes

- Updated design system dependency version to match current version and fixed version mismatch issues.

## 2.0.1

### Patch Changes

- Improvements to build and deployment process:
  - Fixed CI/CD workflows
  - Updated dependency management
  - Improved Storybook deployment
  - Added proper caching

## 2.0.0

### Major Changes

- Reset version to 1.0.0 for proper semantic versioning

## 2.0.0

### Major Changes

- Initial release of the design system with the following features:
  - Configurable themes (finance, logistics, sales)
  - Versioned components (Button v1.0.0, v2.0.0)
  - Design-to-code mapping system
  - Comprehensive documentation
  - Automated release process
  - Storybook integration

### Minor Changes

- 1ba1f44: feat(design-system): Implement comprehensive design tracking and documentation [DESIGN-001]

  This release includes several major improvements to the design system:
  - Added design-to-code mapping system
  - Implemented automated release notes generation
  - Created comprehensive upgrade guides
  - Enhanced contribution guidelines
  - Added design specification tracking
  - Improved version control documentation

  Migration steps and detailed documentation are available in:
  - UPGRADE_GUIDE.md
  - CONTRIBUTING.md
  - src/design-specs/index.ts

## 4.1.0

### Minor Changes

- feat(design-system): Implement comprehensive design tracking and documentation [DESIGN-001]

  This release includes several major improvements to the design system:
  - Added design-to-code mapping system
  - Implemented automated release notes generation
  - Created comprehensive upgrade guides
  - Enhanced contribution guidelines
  - Added design specification tracking
  - Improved version control documentation

  Migration steps and detailed documentation are available in:
  - UPGRADE_GUIDE.md
  - CONTRIBUTING.md
  - src/design-specs/index.ts

## 4.0.0

### Major Changes

- a547c24: New documentation
- a547c24: New documentation

## 3.0.0

### Major Changes

- New documentation

### Minor Changes

- babddac: Added comprehensive tooling and documentation:
  - Design validation system
  - Automated release notes generation
  - Design version mapping documentation
  - Application blueprint template
  - Enhanced PR template
  - Updated contribution guidelines

## 3.0.0

### Major Changes

- new tests

## 2.4.0

### Minor Changes

- Added new Card variants (glass, outlined) and improved styling for modern design system demo. Version bump from 2.2.0 to 2.3.0.
- Added comprehensive test suites for Card, Header, and Button components. Improved accessibility with proper ARIA roles.

## 2.2.0

### Minor Changes

- Added new Card variants (glass, outlined) and improved styling for modern design system demo.

## 2.1.0

### Minor Changes

- Enhanced Card component with modern design:
  - Added glass and outlined variants
  - Improved typography and spacing
  - Added icon support
  - Updated border radius and shadow styles

## 2.0.0

### Major Changes

- New changes

### Minor Changes

- Enhanced Card component with modern design:
  - Added glass and outlined variants
  - Improved typography and spacing
  - Added icon support
  - Removed CardActions in favor of simpler layout
  - Updated border radius and shadow styles

### Patch Changes

- Changed Card component to have square borders instead of rounded corners
- Added sx prop to Card component for additional styling options

## 2.0.0

### Major Changes

- First release of the AB InBev Design System with core components and theme configuration

### Minor Changes

- Added new components:
  - Header: A flexible navigation bar component with support for logo and actions
  - Card: A versatile content container with optional header and actions

## 1.0.0

### Major Changes

- Initial release of the AB InBev Design System with core components and theme configuration
