# Contributing to Our Design System

## Getting Started

1. **Setup Your Environment**
```bash
# Clone the repository
git clone [repository-url]
cd [repository-name]

# Install dependencies
pnpm install

# Start development environment
pnpm dev
```

2. **Understanding the Structure**
- `/apps`: Individual applications
- `/packages/design-system`: Shared component library
- `/packages/[other-packages]`: Additional shared utilities

## Development Workflow

### 1. Component Development

#### Design Compliance
- Always reference the latest Figma designs
- Use design tokens from the theme system
- Follow accessibility guidelines
- Maintain component API consistency

#### Version Control
- Create a new branch for each feature
- Follow the branch naming convention:
  - `feature/component-name`
  - `fix/issue-description`
  - `docs/documentation-update`

#### Testing
- Write unit tests for all new components
- Include accessibility tests
- Test across all supported themes
- Ensure responsive behavior

### 2. Making Changes

#### Component Modifications
1. Check existing implementation in `packages/design-system/src/components`
2. Review design specifications in Figma
3. Update component code
4. Add/update tests
5. Update documentation
6. Create changeset (`pnpm changeset`)

#### New Components
1. Create component directory with index.tsx
2. Add to component exports
3. Create test file
4. Add documentation
5. Create changeset

### 3. Quality Checks

Before submitting PR:
```bash
# Run all checks
pnpm lint
pnpm test
pnpm build

# Format code
pnpm format
```

### 4. Creating Pull Requests

Include:
- Clear description of changes
- Link to design specifications
- Screenshots/videos of changes
- Breaking change warnings
- Migration guide if needed

## Release Process

1. Create changeset describing changes
2. Version packages (`pnpm version-packages`)
3. Review generated changelog
4. Create release PR
5. Merge after approval

## Documentation

- Update component documentation
- Include usage examples
- Document props and variants
- Add accessibility notes
- Update design version mapping

## Design System Guidelines

### Theme Usage
- Use theme tokens for colors
- Follow spacing scale
- Use typography variants
- Maintain consistent border radius

### Accessibility
- Maintain WCAG 2.1 AA compliance
- Include proper ARIA attributes
- Support keyboard navigation
- Test with screen readers

### Component Standards
- Follow React best practices
- Use TypeScript
- Include prop documentation
- Add proper default props
- Handle edge cases

## Need Help?

- Check existing issues
- Review documentation
- Ask in #design-system Slack channel
- Contact the core team 