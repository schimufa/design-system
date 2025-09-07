# Version Discovery & Documentation Guide

This guide explains how to discover new versions, access documentation, and stay updated with the design system.

## 🔍 How to Find New Versions

### 1. **NPM Registry** (Recommended)
Check for the latest published versions:

```bash
# Check current version
npm info @schimufa/design-system version

# Check all available versions
npm info @schimufa/design-system versions --json

# Check for updates in your project
npm outdated @schimufa/design-system
```

### 2. **GitHub Releases**
Visit the releases page for detailed release notes:
- **URL**: https://github.com/schimufa/design-system/releases
- **Features**: Complete changelog, breaking changes, migration guides
- **Downloads**: Source code and built assets

### 3. **Package.json Monitoring**
Monitor the main package.json for version updates:
- **Current Version**: `4.0.1`
- **File**: `packages/design-system/package.json`

### 4. **Automated Notifications**
Set up notifications for new releases:

#### GitHub Watch
1. Go to https://github.com/schimufa/design-system
2. Click "Watch" → "Custom" → "Releases"
3. Get notified of new releases via email/GitHub

#### NPM Version Checking Tools
```bash
# Install npm-check-updates globally
npm install -g npm-check-updates

# Check for updates
ncu @schimufa/design-system

# Check with details
npm outdated @schimufa/design-system
```

## 📚 Documentation Sources

### 1. **Storybook** (Primary Documentation)
Interactive component documentation with live examples:

```bash
# Run Storybook locally
cd packages/design-system
pnpm dev
# Opens at http://localhost:6006
```

**Features:**
- Live component examples
- Version comparisons
- Migration guides
- Design links
- Accessibility examples

### 2. **MDX Documentation**
Detailed component documentation:
- **Location**: `packages/design-system/src/docs/`
- **Files**: 
  - `Button.mdx` - Button component guide
  - `Card.mdx` - Card component guide
  - `Configure.mdx` - Configuration guide

### 3. **TypeDoc API Documentation**
Generated API documentation:

```bash
# Generate API docs
cd packages/design-system
pnpm docs
# Output: docs/ directory
```

### 4. **GitHub Pages** (Published Documentation)
Live documentation site:
- **URL**: https://schimufa.github.io/design-system
- **Features**: Latest docs, Storybook, API reference

### 5. **Repository Documentation**
Comprehensive guides in the repository:
- `README.md` - Getting started
- `COMPONENT_VERSIONING_GUIDE.md` - Version management
- `CONTRIBUTING.md` - Contribution guidelines
- `SETUP_GUIDE.md` - Development setup
- `DESIGN_SYSTEM_DEMO.md` - Demo and examples

## 🔄 Staying Updated

### 1. **Changelog Monitoring**
Track changes in the changelog:
- **File**: `packages/design-system/CHANGELOG.md`
- **Format**: Semantic versioning with detailed changes
- **Sections**: Major, Minor, Patch changes

### 2. **Release Notes**
Comprehensive release information:
- **File**: `RELEASE_NOTES.md`
- **Content**: Feature highlights, migration guides, testing notes

### 3. **Design Version Mapping**
Track design-to-code relationships:
- **File**: `packages/design-system/DESIGN_VERSIONS.md`
- **Content**: Figma links, design hashes, component versions

### 4. **Automated Workflows**
GitHub Actions automatically:
- Generate release notes
- Update documentation
- Deploy Storybook
- Notify stakeholders

## 🛠 Version Discovery Tools

### 1. **CLI Version Checker**
Create a simple version checker script:

```bash
# Create version-check.js
cat > version-check.js << 'EOF'
const https = require('https');
const packageJson = require('./package.json');

const currentVersion = packageJson.dependencies['@schimufa/design-system'] || 
                      packageJson.devDependencies['@schimufa/design-system'];

console.log(`Current version: ${currentVersion}`);

// Check NPM for latest
const options = {
  hostname: 'registry.npmjs.org',
  path: '/@schimufa/design-system',
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const pkg = JSON.parse(data);
    console.log(`Latest version: ${pkg['dist-tags'].latest}`);
    
    if (pkg['dist-tags'].latest !== currentVersion.replace('^', '').replace('~', '')) {
      console.log('🎉 New version available!');
      console.log(`Release notes: https://github.com/schimufa/design-system/releases/tag/v${pkg['dist-tags'].latest}`);
    } else {
      console.log('✅ You have the latest version');
    }
  });
});

req.end();
EOF

# Run the checker
node version-check.js
```

### 2. **Package.json Scripts**
Add helpful scripts to your project:

```json
{
  "scripts": {
    "check-design-system": "npm outdated @schimufa/design-system",
    "update-design-system": "npm update @schimufa/design-system",
    "design-system-info": "npm info @schimufa/design-system"
  }
}
```

### 3. **Component Version Inspector**
Use the built-in version utilities:

```tsx
import { 
  getLatestVersion, 
  getAvailableVersions, 
  getVersionWarning 
} from '@schimufa/design-system';

// Check latest versions
console.log('Latest Button version:', getLatestVersion('Button'));
console.log('Available versions:', getAvailableVersions('Button'));

// Get version warnings
const warning = getVersionWarning('Button', '1.0.0');
if (warning) console.log(warning);
```

## 📱 Notification Setup

### 1. **Slack Integration**
Set up Slack notifications for releases:

```yaml
# .github/workflows/notify-release.yml
name: Notify Release
on:
  release:
    types: [published]
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Slack Notification
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: "🎉 New design system release: ${{ github.event.release.tag_name }}"
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### 2. **Email Notifications**
GitHub can send email notifications:
1. Watch the repository
2. Set notification preferences
3. Choose "Releases only"

### 3. **RSS Feed**
Subscribe to GitHub releases RSS:
- **URL**: https://github.com/schimufa/design-system/releases.atom

## 🔗 Quick Access Links

### Documentation
- **Storybook**: http://localhost:6006 (local) | https://schimufa.github.io/design-system/storybook (live)
- **API Docs**: Generated via `pnpm docs`
- **Repository**: https://github.com/schimufa/design-system

### Version Information
- **NPM Package**: https://www.npmjs.com/package/@schimufa/design-system
- **GitHub Releases**: https://github.com/schimufa/design-system/releases
- **Changelog**: `packages/design-system/CHANGELOG.md`

### Design Resources
- **Figma**: Links in component documentation
- **Design Specs**: `packages/design-system/DESIGN_VERSIONS.md`
- **Component Mapping**: `packages/design-system/src/design-specs/index.ts`

## 🚀 Best Practices

### For Developers
1. **Subscribe to releases** on GitHub
2. **Check for updates monthly** using npm outdated
3. **Read changelogs** before updating
4. **Test in staging** before production updates
5. **Use version warnings** during development

### For Design Teams
1. **Link designs** to component versions
2. **Update design specs** when releasing
3. **Coordinate with development** on breaking changes
4. **Use Storybook** for design reviews

### For Product Teams
1. **Plan update cycles** around releases
2. **Review breaking changes** impact
3. **Coordinate migrations** across teams
4. **Monitor user feedback** after updates

## 🆘 Getting Help

### Documentation Issues
1. Check Storybook examples
2. Review component MDX files
3. Check GitHub discussions
4. Create documentation issues

### Version Questions
1. Review version discovery guide
2. Check component versioning guide
3. Use version utilities
4. Ask in team channels

### Technical Support
1. GitHub Issues: https://github.com/schimufa/design-system/issues
2. Discussions: https://github.com/schimufa/design-system/discussions
3. Team Slack: #design-system channel
4. Email: design-system@yourorg.com
