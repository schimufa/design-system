// Version management utilities for design system components

export type ComponentVersion = '1.0.0' | '2.0.0';
export type ComponentName = 'Button' | 'Card' | 'Header';

export interface VersionInfo {
  version: ComponentVersion;
  isLatest: boolean;
  isDeprecated: boolean;
  deprecationDate?: string;
  migrationPath?: ComponentVersion;
}

export interface ComponentVersionConfig {
  [componentName: string]: {
    [version: string]: {
      isLatest: boolean;
      isDeprecated: boolean;
      deprecationDate?: string;
      migrationPath?: ComponentVersion;
      supportEndDate?: string;
    };
  };
}

// Component version configuration
export const componentVersions: ComponentVersionConfig = {
  Button: {
    '1.0.0': {
      isLatest: false,
      isDeprecated: false,
      migrationPath: '2.0.0',
      supportEndDate: '2025-12-31', // Support until end of 2025
    },
    '2.0.0': {
      isLatest: true,
      isDeprecated: false,
    },
  },
  Card: {
    '1.0.0': {
      isLatest: false,
      isDeprecated: false,
      migrationPath: '2.0.0',
      supportEndDate: '2025-12-31',
    },
    '2.0.0': {
      isLatest: true,
      isDeprecated: false,
    },
  },
  Header: {
    '1.0.0': {
      isLatest: true,
      isDeprecated: false,
    },
  },
};

/**
 * Get version information for a component
 */
export function getVersionInfo(
  componentName: ComponentName,
  version: ComponentVersion
): VersionInfo | null {
  const config = componentVersions[componentName]?.[version];
  if (!config) return null;

  return {
    version,
    isLatest: config.isLatest,
    isDeprecated: config.isDeprecated,
    deprecationDate: config.deprecationDate,
    migrationPath: config.migrationPath,
  };
}

/**
 * Get the latest version of a component
 */
export function getLatestVersion(
  componentName: ComponentName
): ComponentVersion | null {
  const versions = componentVersions[componentName];
  if (!versions) return null;

  const latestEntry = Object.entries(versions).find(
    ([, config]) => config.isLatest
  );
  return latestEntry ? (latestEntry[0] as ComponentVersion) : null;
}

/**
 * Get all available versions for a component
 */
export function getAvailableVersions(
  componentName: ComponentName
): ComponentVersion[] {
  const versions = componentVersions[componentName];
  if (!versions) return [];

  return Object.keys(versions) as ComponentVersion[];
}

/**
 * Check if a version is deprecated
 */
export function isVersionDeprecated(
  componentName: ComponentName,
  version: ComponentVersion
): boolean {
  const config = componentVersions[componentName]?.[version];
  return config?.isDeprecated || false;
}

/**
 * Get migration path for a version
 */
export function getMigrationPath(
  componentName: ComponentName,
  version: ComponentVersion
): ComponentVersion | null {
  const config = componentVersions[componentName]?.[version];
  return config?.migrationPath || null;
}

/**
 * Check if version support is ending soon (within 6 months)
 */
export function isSupportEndingSoon(
  componentName: ComponentName,
  version: ComponentVersion
): boolean {
  const config = componentVersions[componentName]?.[version];
  if (!config?.supportEndDate) return false;

  const endDate = new Date(config.supportEndDate);
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  return endDate <= sixMonthsFromNow;
}

/**
 * Generate version warning message
 */
export function getVersionWarning(
  componentName: ComponentName,
  version: ComponentVersion
): string | null {
  const info = getVersionInfo(componentName, version);
  if (!info) return null;

  if (info.isDeprecated) {
    const migrationPath = info.migrationPath
      ? ` Please migrate to version ${info.migrationPath}.`
      : '';
    return `⚠️ ${componentName} v${version} is deprecated.${migrationPath}`;
  }

  if (isSupportEndingSoon(componentName, version)) {
    const migrationPath = info.migrationPath
      ? ` Consider migrating to version ${info.migrationPath}.`
      : '';
    return `⏰ Support for ${componentName} v${version} is ending soon.${migrationPath}`;
  }

  if (!info.isLatest) {
    const latestVersion = getLatestVersion(componentName);
    return `💡 A newer version of ${componentName} is available (v${latestVersion}). Consider upgrading for the latest features.`;
  }

  return null;
}

/**
 * Validate version prop
 */
export function validateVersion(
  componentName: ComponentName,
  version?: ComponentVersion
): ComponentVersion {
  if (!version) {
    return getLatestVersion(componentName) || '1.0.0';
  }

  const availableVersions = getAvailableVersions(componentName);
  if (!availableVersions.includes(version)) {
    console.warn(
      `Invalid version "${version}" for ${componentName}. Using latest version.`
    );
    return getLatestVersion(componentName) || '1.0.0';
  }

  return version;
}

/**
 * Development helper to log version warnings
 */
export function logVersionWarning(
  componentName: ComponentName,
  version: ComponentVersion
): void {
  if (process.env.NODE_ENV === 'development') {
    const warning = getVersionWarning(componentName, version);
    if (warning) {
      console.warn(`[Design System] ${warning}`);
    }
  }
}
