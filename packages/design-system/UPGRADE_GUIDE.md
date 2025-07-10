# Design System Upgrade Guide

This guide helps you upgrade between different versions of our design system components.

## Quick Reference

### Version Compatibility Matrix

| Component | Latest Version | Supported Versions | Minimum Version |
| --------- | -------------- | ------------------ | --------------- |
| Button    | 2.0.0          | 1.0.0, 2.0.0       | 1.0.0           |
| Card      | 1.0.0          | 1.0.0              | 1.0.0           |

### Breaking Changes Summary

#### Button 2.0.0

- Removed uppercase text transform
- Changed default border radius
- Updated theme integration

## Detailed Migration Guides

### Button: 1.0.0 → 2.0.0

#### Changes

1. Text Casing

   ```diff
   - <Button>SUBMIT</Button>
   + <Button version="2.0.0">Submit</Button>
   ```

2. Border Radius

   ```diff
   - <Button>Sharp Corners</Button>
   + <Button version="2.0.0" style={{ borderRadius: 4 }}>Keep Sharp Corners</Button>
   ```

3. Theme Integration
   ```diff
   - <Button color="primary">Old Theme</Button>
   + <Button version="2.0.0" color="primary">New Theme</Button>
   ```

#### Migration Steps

1. Update version prop to "2.0.0"
2. Review and update button text casing
3. Check border radius compatibility
4. Test with new theme system

### Card: Future Versions

The Card component is currently at version 1.0.0. Future upgrades will be documented here.

## Gradual Migration Strategy

### Step 1: Audit Current Usage

```bash
# Find all Button usage
grep -r "<Button" ./src

# Check current versions
grep -r "version=" ./src
```

### Step 2: Update Dependencies

```json
{
  "dependencies": {
    "@schimufa/design-system": "^2.0.0"
  }
}
```

### Step 3: Incremental Component Updates

1. Start with low-impact pages
2. Update one component type at a time
3. Test thoroughly after each update

## Version Coexistence

Our design system supports multiple versions of components running simultaneously:

```jsx
// Old and new versions can coexist
function MyComponent() {
  return (
    <div>
      <Button version="1.0.0">Old Button</Button>
      <Button version="2.0.0">New Button</Button>
    </div>
  );
}
```

## Testing Changes

### Visual Regression

```bash
# Run visual regression tests
pnpm test:visual

# Update snapshots if needed
pnpm test:visual -u
```

### Accessibility

```bash
# Check accessibility
pnpm test:a11y
```

## Troubleshooting

### Common Issues

1. Version Mismatch

   ```
   Error: Version "1.5.0" is not supported
   Solution: Use only supported versions (1.0.0 or 2.0.0)
   ```

2. Theme Conflicts
   ```
   Error: Invalid theme configuration
   Solution: Ensure theme provider is updated to latest version
   ```

### Getting Help

- Check [GitHub Issues](https://github.com/your-org/design-system/issues)
- Join #design-system Slack channel
- Email: design-system@your-org.com

## Future Updates

Stay informed about upcoming changes:

1. Watch our GitHub repository
2. Subscribe to our changelog
3. Join our monthly design system meetings

## Version History

See our [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.
