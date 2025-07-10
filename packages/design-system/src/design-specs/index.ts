import { ComponentType } from 'react';

interface DesignSpec {
  version: string;
  figmaFileId: string;
  figmaNodeId: string;
  component: string;
  commitSha?: string;
  prNumber?: string;
  designTicket: string;
  breakingChanges?: string[];
  migrationGuide?: string;
}

interface DesignMapping {
  [key: string]: {
    [version: string]: DesignSpec;
  };
}

export const designSpecs: DesignMapping = {
  Button: {
    '1.0.0': {
      version: '1.0.0',
      figmaFileId: 'Fxyz123',
      figmaNodeId: '1:123',
      component: 'Button',
      designTicket: 'DESIGN-101',
      commitSha: 'abc123',
      prNumber: '45',
    },
    '2.0.0': {
      version: '2.0.0',
      figmaFileId: 'Fxyz124',
      figmaNodeId: '1:124',
      component: 'Button',
      designTicket: 'DESIGN-102',
      commitSha: 'def456',
      prNumber: '46',
      breakingChanges: [
        'Removed uppercase text transform',
        'Changed default border radius',
      ],
      migrationGuide: `
To migrate from v1 to v2:
1. Update version prop to "2.0.0"
2. Review text casing in button labels
3. Check border radius compatibility
      `,
    },
  },
  Card: {
    '1.0.0': {
      version: '1.0.0',
      figmaFileId: 'Fxyz125',
      figmaNodeId: '1:125',
      component: 'Card',
      designTicket: 'DESIGN-103',
      commitSha: 'ghi789',
      prNumber: '47',
    },
  },
};

export function getDesignSpec(component: string, version: string): DesignSpec | undefined {
  return designSpecs[component]?.[version];
}

export function getLatestVersion(component: string): string {
  const versions = Object.keys(designSpecs[component] || {});
  return versions.sort().pop() || '';
}

export function getFigmaUrl(component: string, version: string): string {
  const spec = getDesignSpec(component, version);
  if (!spec) return '';
  return `https://www.figma.com/file/${spec.figmaFileId}?node-id=${spec.figmaNodeId}`;
}

export function getCommitUrl(component: string, version: string): string {
  const spec = getDesignSpec(component, version);
  if (!spec?.commitSha) return '';
  return `https://github.com/your-org/design-system/commit/${spec.commitSha}`;
}

export function getPRUrl(component: string, version: string): string {
  const spec = getDesignSpec(component, version);
  if (!spec?.prNumber) return '';
  return `https://github.com/your-org/design-system/pull/${spec.prNumber}`;
}

export function getMigrationGuide(component: string, fromVersion: string, toVersion: string): string {
  const spec = getDesignSpec(component, toVersion);
  return spec?.migrationGuide || 'No migration guide available.';
}

export function getBreakingChanges(component: string, version: string): string[] {
  const spec = getDesignSpec(component, version);
  return spec?.breakingChanges || [];
} 