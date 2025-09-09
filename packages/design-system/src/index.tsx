// Export all components
export * from './components/Button';
export * from './components/Card';

// Export theme system
export { getTheme, themes } from './themes';
export type { AppTheme } from './themes';

// Export design specs
export * from './design-specs';

// Export version utilities (with specific exports to avoid conflicts)
export {
  validateVersion,
  logVersionWarning,
  componentVersions,
  getMigrationPath,
  isSupportEndingSoon,
  getVersionWarning,
} from './utils/version-manager';

export type { ComponentVersion, ComponentName } from './utils/version-manager';

export {
  checkForUpdates,
  getDocumentationLinks,
  getComponentDocumentation,
  getUpdateNotification,
  getDevelopmentInfo,
  getMigrationInfo,
  logVersionDiscoveryInfo,
  createVersionWidget,
  initVersionDiscovery,
} from './utils/version-discovery';

// Export enhanced utilities
export {
  EnhancedVersionManager,
  createVersionManager,
  versionManager,
  enhancedBreakingChanges
} from './utils/enhanced-version-manager';

export {
  CommunicationManager,
  communicationManager
} from './utils/communication-manager';

export {
  TeamOnboardingManager,
  teamOnboardingManager
} from './utils/team-onboarding-manager';

export {
  DesignFidelityChecker,
  designFidelityChecker
} from './utils/design-fidelity-checker';

// Export version info types with aliases to avoid conflicts
export type { VersionInfo as VersionManagerInfo } from './utils/version-manager';
export type { VersionInfo as VersionDiscoveryInfo } from './utils/version-discovery';
