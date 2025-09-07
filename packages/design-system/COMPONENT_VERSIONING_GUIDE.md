# Component Versioning Guide

This guide explains how to use and manage different versions of components in the design system.

## Overview

Our design system supports multiple versions of components to enable:

- **Gradual migration** from old to new designs
- **Backward compatibility** for existing applications
- **A/B testing** of different component versions
- **Parallel development** of design iterations

## How Component Versioning Works

### Version Prop Pattern

Each versioned component accepts a `version` prop:

```tsx
import { Button, Card } from '@schimufa/design-system';

// Use specific versions
<Button version="1.0.0" variant="contained">Legacy Button</Button>
<Button version="2.0.0" variant="contained">Modern Button</Button>

<Card version="1.0.0" title="Legacy Card">Content</Card>
<Card version="2.0.0" title="Modern Card">Content</Card>
```

### Default Behavior

- If no `version` prop is provided, components default to `1.0.0` for backward compatibility
- Latest versions are recommended for new development

## Available Component Versions

### Button Component

#### Version 1.0.0 (Legacy)

- **Features**: Sharp corners (4px), uppercase text
- **Status**: Supported until 2025-12-31
- **Migration Path**: v2.0.0

```tsx
<Button version="1.0.0" variant="contained">
  LEGACY BUTTON
</Button>
```

#### Version 2.0.0 (Current)

- **Features**: Rounded corners (20px), normal text case
- **Status**: Latest, recommended
- **Breaking Changes**: Text transform, border radius

```tsx
<Button version="2.0.0" variant="contained">
  Modern Button
</Button>
```

### Card Component

#### Version 1.0.0 (Legacy)

- **Features**: 16px border radius, standard padding
- **Status**: Supported until 2025-12-31
- **Migration Path**: v2.0.0

```tsx
<Card version="1.0.0" title="Legacy Card">
  Content with original styling
</Card>
```

#### Version 2.0.0 (Current)

- **Features**: 12px border radius, optimized padding
- **Status**: Latest, recommended
- **Breaking Changes**: Border radius, padding structure

```tsx
<Card version="2.0.0" title="Modern Card">
  Content with updated styling
</Card>
```

## Migration Strategies

### 1. Gradual Migration (Recommended)

Migrate components incrementally across your application:

```tsx
// Phase 1: Update critical pages
<Button version="2.0.0">Primary Action</Button>

// Phase 2: Update secondary pages
<Button version="2.0.0">Secondary Action</Button>

// Phase 3: Update remaining components
<Button version="2.0.0">Tertiary Action</Button>
```

### 2. Feature Flag Migration

Use feature flags to control version rollout:

```tsx
const useNewDesign = useFeatureFlag('new-button-design');

<Button version={useNewDesign ? '2.0.0' : '1.0.0'}>Action Button</Button>;
```

### 3. A/B Testing

Test different versions with user segments:

```tsx
const buttonVersion = userSegment === 'beta' ? '2.0.0' : '1.0.0';

<Button version={buttonVersion}>Test Button</Button>;
```

## Version Management Utilities

### Import Version Utilities

```tsx
import {
  getVersionInfo,
  getLatestVersion,
  isVersionDeprecated,
  getMigrationPath,
  getVersionWarning,
} from '@schimufa/design-system/utils/version-manager';
```

### Check Version Status

```tsx
// Get version information
const buttonInfo = getVersionInfo('Button', '1.0.0');
console.log(buttonInfo);
// {
//   version: '1.0.0',
//   isLatest: false,
//   isDeprecated: false,
//   migrationPath: '2.0.0'
// }

// Check if version is deprecated
const isDeprecated = isVersionDeprecated('Button', '1.0.0');

// Get migration path
const migrationPath = getMigrationPath('Button', '1.0.0');

// Get latest version
const latest = getLatestVersion('Button');
```

### Development Warnings

In development mode, the system automatically logs warnings for:

- Deprecated versions
- Versions with ending support
- Available newer versions

```tsx
// This will log a warning in development
<Button version="1.0.0">Old Button</Button>
// Console: "💡 A newer version of Button is available (v2.0.0)"
```

## Storybook Integration

### Version Comparison Stories

View all versions side-by-side in Storybook:

- **Button → Version Comparison**: Compare v1.0.0 vs v2.0.0
- **Button → Migration Example**: See migration guide and breaking changes
- **Card → Version Comparison**: Compare card versions

### Design Links

Each version story includes:

- Link to Figma design file
- Migration guide
- Breaking changes list
- Design specifications

## Best Practices

### For Developers

1. **Use latest versions** for new features
2. **Plan migration windows** for version updates
3. **Test thoroughly** when changing versions
4. **Monitor deprecation warnings** in development
5. **Document version choices** in code comments

```tsx
// Using v1.0.0 temporarily for legacy page compatibility
// TODO: Migrate to v2.0.0 after design review (JIRA-123)
<Button version="1.0.0">Legacy Action</Button>
```

### For Design Teams

1. **Version designs** in Figma with clear naming
2. **Document breaking changes** in design specs
3. **Provide migration guides** for design updates
4. **Coordinate with development** on version timelines

### For Product Teams

1. **Plan version rollouts** strategically
2. **Use A/B testing** for major design changes
3. **Monitor user feedback** during migrations
4. **Communicate changes** to stakeholders

## Version Lifecycle

### Support Timeline

- **Active Support**: Latest version receives all updates
- **Maintenance Support**: Previous versions receive critical fixes only
- **End of Life**: Deprecated versions removed from codebase

### Deprecation Process

1. **Announcement**: 6 months notice before deprecation
2. **Warning Period**: Development warnings for 3 months
3. **Deprecation**: Version marked as deprecated
4. **Removal**: Version removed after migration period

## Troubleshooting

### Common Issues

#### Version Not Found

```tsx
// Error: Invalid version "3.0.0" for Button
<Button version="3.0.0">Button</Button>

// Solution: Use available version
<Button version="2.0.0">Button</Button>
```

#### Styling Conflicts

```tsx
// Issue: Custom styles override version styles
<Button version="2.0.0" sx={{ borderRadius: '4px' }}>
  Button
</Button>

// Solution: Let version control base styles
<Button version="2.0.0">
  Button
</Button>
```

#### Migration Timing

```tsx
// Issue: Mixing versions inconsistently
<Button version="1.0.0">Action 1</Button>
<Button version="2.0.0">Action 2</Button>

// Solution: Migrate consistently by feature/page
<Button version="2.0.0">Action 1</Button>
<Button version="2.0.0">Action 2</Button>
```

## Resources

- **Storybook**: View all component versions and examples
- **Design Specs**: `src/design-specs/index.ts`
- **Version Manager**: `src/utils/version-manager.ts`
- **Migration Guides**: Available in Storybook stories
- **Figma Links**: Embedded in component documentation

## Support

For questions about component versioning:

1. Check this guide and Storybook documentation
2. Review design specs and migration guides
3. Contact the design system team
4. Create an issue in the design system repository
