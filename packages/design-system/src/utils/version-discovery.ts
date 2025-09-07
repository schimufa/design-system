// Version discovery utilities for finding new versions and documentation

export interface VersionInfo {
  current: string;
  latest?: string;
  available: string[];
  hasUpdate: boolean;
  releaseNotes?: string;
  changelog?: string;
}

export interface DocumentationLinks {
  storybook: {
    local: string;
    production: string;
  };
  github: {
    repository: string;
    releases: string;
    issues: string;
    discussions: string;
  };
  npm: {
    package: string;
  };
  docs: {
    api: string;
    guides: string[];
    changelog: string;
  };
  design: {
    figma?: string;
    specs: string;
  };
}

/**
 * Get comprehensive version information
 */
export function getVersionInfo(): VersionInfo {
  // In a real implementation, this would fetch from NPM registry
  // For now, we'll return static information based on current setup
  return {
    current: '4.0.1',
    latest: '4.0.1',
    available: [
      '1.0.0',
      '2.0.0',
      '2.0.1',
      '2.0.2',
      '2.0.3',
      '2.0.4',
      '2.0.5',
      '3.0.0',
      '4.0.0',
      '4.0.1',
    ],
    hasUpdate: false,
    releaseNotes:
      'https://github.com/schimufa/design-system/releases/tag/v4.0.1',
    changelog:
      'https://github.com/schimufa/design-system/blob/main/packages/design-system/CHANGELOG.md',
  };
}

/**
 * Get all documentation and resource links
 */
export function getDocumentationLinks(): DocumentationLinks {
  return {
    storybook: {
      local: 'http://localhost:6006',
      production: 'https://schimufa.github.io/design-system/storybook',
    },
    github: {
      repository: 'https://github.com/schimufa/design-system',
      releases: 'https://github.com/schimufa/design-system/releases',
      issues: 'https://github.com/schimufa/design-system/issues',
      discussions: 'https://github.com/schimufa/design-system/discussions',
    },
    npm: {
      package: 'https://www.npmjs.com/package/@schimufa/design-system',
    },
    docs: {
      api: 'https://schimufa.github.io/design-system/docs',
      guides: [
        'VERSION_DISCOVERY_GUIDE.md',
        'COMPONENT_VERSIONING_GUIDE.md',
        'CONTRIBUTING.md',
        'SETUP_GUIDE.md',
        'DESIGN_SYSTEM_DEMO.md',
      ],
      changelog: 'CHANGELOG.md',
    },
    design: {
      specs: 'DESIGN_VERSIONS.md',
    },
  };
}

/**
 * Check if there are new versions available
 */
export async function checkForUpdates(): Promise<{
  hasUpdates: boolean;
  currentVersion: string;
  latestVersion: string;
  updateCommand: string;
  releaseNotesUrl: string;
}> {
  // In a real implementation, this would make an HTTP request to NPM registry
  // For demonstration, we'll simulate the check
  const versionInfo = getVersionInfo();

  return {
    hasUpdates: versionInfo.hasUpdate,
    currentVersion: versionInfo.current,
    latestVersion: versionInfo.latest || versionInfo.current,
    updateCommand: 'npm update @schimufa/design-system',
    releaseNotesUrl: versionInfo.releaseNotes || '',
  };
}

/**
 * Get component-specific documentation
 */
export function getComponentDocumentation(componentName: string): {
  storybook: string;
  mdx: string;
  api: string;
  examples: string[];
} {
  const baseUrl = 'https://schimufa.github.io/design-system';

  return {
    storybook: `${baseUrl}/storybook/?path=/docs/components-${componentName.toLowerCase()}--docs`,
    mdx: `src/docs/${componentName}.mdx`,
    api: `${baseUrl}/docs/interfaces/${componentName}Props.html`,
    examples: [
      `${baseUrl}/storybook/?path=/story/components-${componentName.toLowerCase()}--default`,
      `${baseUrl}/storybook/?path=/story/components-${componentName.toLowerCase()}--version-comparison`,
    ],
  };
}

/**
 * Generate update notification message
 */
export function getUpdateNotification(
  hasUpdate: boolean,
  currentVersion: string,
  latestVersion: string
): string {
  if (!hasUpdate) {
    return `✅ You're using the latest version (${currentVersion}) of the design system.`;
  }

  return `
🎉 New design system version available!

Current: ${currentVersion}
Latest: ${latestVersion}

To update:
npm update @schimufa/design-system

Release notes: https://github.com/schimufa/design-system/releases/tag/v${latestVersion}
  `.trim();
}

/**
 * Get development setup information
 */
export function getDevelopmentInfo(): {
  storybookCommand: string;
  buildCommand: string;
  testCommand: string;
  docsCommand: string;
  lintCommand: string;
} {
  return {
    storybookCommand: 'pnpm dev',
    buildCommand: 'pnpm build',
    testCommand: 'pnpm test',
    docsCommand: 'pnpm docs',
    lintCommand: 'pnpm lint',
  };
}

/**
 * Get migration information for version updates
 */
export function getMigrationInfo(
  fromVersion: string,
  toVersion: string
): {
  hasBreakingChanges: boolean;
  migrationGuide: string;
  estimatedEffort: 'low' | 'medium' | 'high';
  affectedComponents: string[];
} {
  // This would typically be fetched from a migration database or API
  const majorVersionChange =
    fromVersion.split('.')[0] !== toVersion.split('.')[0];

  return {
    hasBreakingChanges: majorVersionChange,
    migrationGuide: majorVersionChange
      ? `See migration guide: https://github.com/schimufa/design-system/blob/main/MIGRATION_${toVersion}.md`
      : 'No breaking changes - safe to update',
    estimatedEffort: majorVersionChange ? 'high' : 'low',
    affectedComponents: majorVersionChange ? ['Button', 'Card'] : [],
  };
}

/**
 * Log version discovery information to console (development only)
 */
export function logVersionDiscoveryInfo(): void {
  if (process.env.NODE_ENV !== 'development') return;

  const versionInfo = getVersionInfo();
  const links = getDocumentationLinks();

  console.group('🎨 Design System Version Info');
  console.log(`Current version: ${versionInfo.current}`);
  console.log(`Latest version: ${versionInfo.latest}`);
  console.log(`Has updates: ${versionInfo.hasUpdate ? '🎉 Yes' : '✅ No'}`);
  console.groupEnd();

  console.group('📚 Documentation Links');
  console.log(`Storybook (local): ${links.storybook.local}`);
  console.log(`Storybook (prod): ${links.storybook.production}`);
  console.log(`GitHub: ${links.github.repository}`);
  console.log(`NPM: ${links.npm.package}`);
  console.groupEnd();
}

/**
 * Create a version discovery widget for development
 */
export function createVersionWidget(): HTMLElement | null {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const widget = document.createElement('div');
  widget.id = 'design-system-version-widget';
  widget.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1976d2;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    cursor: pointer;
    z-index: 10000;
    transition: all 0.2s ease;
  `;

  const versionInfo = getVersionInfo();
  const links = getDocumentationLinks();

  widget.innerHTML = `
    <div>🎨 Design System v${versionInfo.current}</div>
    <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">
      Click for docs & updates
    </div>
  `;

  widget.addEventListener('click', () => {
    const menu = document.createElement('div');
    menu.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      padding: 16px;
      min-width: 250px;
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #333;
    `;

    menu.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 12px;">Design System Resources</div>
      <div style="margin-bottom: 8px;">
        <a href="${links.storybook.local}" target="_blank" style="color: #1976d2; text-decoration: none;">
          📖 Storybook (Local)
        </a>
      </div>
      <div style="margin-bottom: 8px;">
        <a href="${links.github.releases}" target="_blank" style="color: #1976d2; text-decoration: none;">
          🚀 Releases & Updates
        </a>
      </div>
      <div style="margin-bottom: 8px;">
        <a href="${links.npm.package}" target="_blank" style="color: #1976d2; text-decoration: none;">
          📦 NPM Package
        </a>
      </div>
      <div style="margin-bottom: 8px;">
        <a href="${links.github.repository}" target="_blank" style="color: #1976d2; text-decoration: none;">
          💻 GitHub Repository
        </a>
      </div>
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
        Version: ${versionInfo.current} | ${versionInfo.hasUpdate ? '🎉 Update available' : '✅ Up to date'}
      </div>
    `;

    // Close menu when clicking outside
    const closeMenu = (e: Event) => {
      if (!menu.contains(e.target as Node)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    };

    setTimeout(() => document.addEventListener('click', closeMenu), 100);
    document.body.appendChild(menu);
  });

  return widget;
}

/**
 * Initialize version discovery in development
 */
export function initVersionDiscovery(): void {
  if (process.env.NODE_ENV === 'development') {
    // Log version info
    logVersionDiscoveryInfo();

    // Create version widget if in browser
    if (typeof window !== 'undefined') {
      const widget = createVersionWidget();
      if (widget) {
        document.body.appendChild(widget);
      }
    }
  }
}
