# 🔍 Version Discovery & Updates

Quick reference for finding new versions and staying updated with the design system.

## Quick Commands

```bash
# Check for updates
pnpm check-version          # Comprehensive version check
pnpm check-updates          # NPM outdated check
pnpm version-info           # NPM package info

# Update to latest
pnpm update @schimufa/design-system
```

## 📱 Automated Notifications

### GitHub Watch
1. Visit: https://github.com/schimufa/design-system
2. Click **Watch** → **Custom** → **Releases**
3. Get email notifications for new releases

### NPM Monitoring
```bash
# Install monitoring tool
npm install -g npm-check-updates

# Check for updates
ncu @schimufa/design-system
```

## 📚 Documentation Access

| Resource | Local | Production |
|----------|-------|------------|
| **Storybook** | `pnpm dev` → http://localhost:6006 | https://schimufa.github.io/design-system/storybook |
| **API Docs** | `pnpm docs` → `docs/` | https://schimufa.github.io/design-system/docs |
| **Repository** | - | https://github.com/schimufa/design-system |
| **NPM Package** | - | https://www.npmjs.com/package/@schimufa/design-system |

## 🔄 Version Types & Impact

| Type | Example | Impact | Action |
|------|---------|---------|---------|
| **Major** | 4.0.0 → 5.0.0 | Breaking changes | Review migration guide |
| **Minor** | 4.0.0 → 4.1.0 | New features | Safe to update |
| **Patch** | 4.0.0 → 4.0.1 | Bug fixes | Recommended update |

## 🛠 Development Tools

### Version Discovery Widget
```tsx
import { initVersionDiscovery } from '@schimufa/design-system';

// Initialize in development
initVersionDiscovery(); // Shows version widget in bottom-right
```

### Programmatic Checks
```tsx
import { 
  checkForUpdates, 
  getVersionInfo,
  getDocumentationLinks 
} from '@schimufa/design-system';

// Check for updates
const updates = await checkForUpdates();
console.log(updates.hasUpdates ? 'Update available!' : 'Up to date');

// Get version info
const info = getVersionInfo();
console.log(`Current: ${info.current}, Latest: ${info.latest}`);

// Get documentation links
const links = getDocumentationLinks();
console.log('Storybook:', links.storybook.local);
```

## 📋 Migration Planning

### Before Updating
1. **Check changelog**: Review breaking changes
2. **Test in staging**: Verify compatibility
3. **Plan rollout**: Coordinate with team
4. **Backup**: Commit current state

### Update Process
```bash
# 1. Check current version
npm list @schimufa/design-system

# 2. Check for updates
pnpm check-version

# 3. Update package
pnpm update @schimufa/design-system

# 4. Test changes
pnpm test
pnpm build

# 5. Review and commit
git add package.json pnpm-lock.yaml
git commit -m "Update design system to vX.X.X"
```

## 🆘 Getting Help

- **Documentation Issues**: Check VERSION_DISCOVERY_GUIDE.md
- **Version Questions**: Use `pnpm check-version`
- **Technical Support**: https://github.com/schimufa/design-system/issues
- **Discussions**: https://github.com/schimufa/design-system/discussions

---

For complete documentation, see [VERSION_DISCOVERY_GUIDE.md](./VERSION_DISCOVERY_GUIDE.md)
