# Contributing to Our Design System

## Design-to-Code Workflow

### 1. Design Changes

- All design changes must start with a Figma design document
- Create a design ticket with format: `[DESIGN-{number}] Component: Change Description`
- Link the Figma file in the ticket using format: `figma://file/{file-key}?node-id={node-id}`

### 2. Branch Naming Convention

```
feature/DESIGN-123/button-variant
bugfix/DESIGN-124/card-shadow
docs/DESIGN-125/upgrade-guide
```

### 3. Commit Messages

Use the following format to link commits to designs:

```
feat(button): add glass variant [DESIGN-123]
fix(card): adjust shadow values [DESIGN-124]
docs: update component guidelines [DESIGN-125]
```

### 4. Pull Request Template

- Title: `[DESIGN-{number}] Brief description`
- Required sections:
  - Design Reference (Figma link)
  - Screenshots (before/after)
  - Version Impact (major/minor/patch)
  - Breaking Changes
  - Migration Steps

## Development Workflow

### 1. Local Setup

```bash
pnpm install
pnpm storybook
```

### 2. Component Development

- Create/update component in `packages/design-system/src/components`
- Add/update stories in component directory
- Add/update tests
- Update documentation in `src/docs`

### 3. Version Management

- Run `pnpm changeset` to document changes
- Follow semver guidelines:
  - Major: Breaking changes
  - Minor: New features
  - Patch: Bug fixes

### 4. Quality Checks

- Lint: `pnpm lint`
- Test: `pnpm test`
- Build: `pnpm build`
- Storybook: `pnpm storybook`

## Design System Standards

### 1. Component Structure

```
components/
  Button/
    index.tsx         # Component code
    Button.test.tsx   # Tests
    Button.stories.tsx # Stories
    styles.ts        # Styled components
    types.ts         # TypeScript types
```

### 2. Design Tokens

- Use theme variables from `src/themes`
- No hard-coded values
- Follow Material-UI guidelines

### 3. Documentation

- Every component needs:
  - Props table
  - Usage examples
  - Accessibility notes
  - Version history

### 4. Testing Requirements

- Unit tests
- Visual regression tests
- Accessibility tests
- Story tests

## Release Process

### 1. Preparation

- Update changeset files
- Review documentation
- Run full test suite

### 2. Release Steps

```bash
pnpm changeset version
pnpm install
git add .
git commit -m "chore: version packages"
git push
```

### 3. Post-Release

- Update release notes
- Notify team
- Update documentation

## Design Specification Compliance

### 1. Visual Compliance

- Match Figma specifications exactly
- Use design tokens consistently
- Follow spacing guidelines

### 2. Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support

### 3. Responsive Design

- Mobile-first approach
- Breakpoint consistency
- Fluid typography

## Getting Help

- Design System Slack: #design-system
- Documentation: [Internal Wiki Link]
- Team: @design-system-team
