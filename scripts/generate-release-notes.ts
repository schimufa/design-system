import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface Changeset {
  type: 'major' | 'minor' | 'patch';
  description: string;
  designId?: string;
  component?: string;
}

function extractDesignId(message: string): string | undefined {
  const match = message.match(/\[DESIGN-(\d+)\]/);
  return match ? match[1] : undefined;
}

function extractComponent(message: string): string | undefined {
  const match = message.match(/^(?:feat|fix|docs)\(([\w-]+)\):/);
  return match ? match[1] : undefined;
}

function getLatestTag(): string {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim();
  } catch {
    return 'HEAD';
  }
}

function getChangesets(): Changeset[] {
  const changesetDir = path.join(process.cwd(), '.changeset');
  const changesets: Changeset[] = [];

  fs.readdirSync(changesetDir)
    .filter(file => file.endsWith('.md'))
    .forEach(file => {
      const content = fs.readFileSync(path.join(changesetDir, file), 'utf-8');
      const lines = content.split('\n');
      
      const type = lines[0].includes('major') ? 'major' 
        : lines[0].includes('minor') ? 'minor' 
        : 'patch';

      const description = lines.slice(2).join('\n').trim();
      const designId = extractDesignId(description);
      const component = extractComponent(description);

      changesets.push({ type, description, designId, component });
    });

  return changesets;
}

function getCommitsSinceLastRelease(): string[] {
  const lastTag = getLatestTag();
  return execSync(`git log ${lastTag}..HEAD --pretty=format:"%s"`)
    .toString()
    .split('\n')
    .filter(Boolean);
}

function generateReleaseNotes(): string {
  const changesets = getChangesets();
  const commits = getCommitsSinceLastRelease();
  const date = new Date().toISOString().split('T')[0];

  let notes = `# Release Notes (${date})\n\n`;

  // Breaking Changes
  const breakingChanges = changesets.filter(c => c.type === 'major');
  if (breakingChanges.length > 0) {
    notes += '## 🚨 Breaking Changes\n\n';
    breakingChanges.forEach(change => {
      notes += `- ${change.description}${change.designId ? ` [DESIGN-${change.designId}]` : ''}\n`;
    });
    notes += '\n';
  }

  // New Features
  const features = changesets.filter(c => c.type === 'minor');
  if (features.length > 0) {
    notes += '## ✨ New Features\n\n';
    features.forEach(change => {
      notes += `- ${change.description}${change.designId ? ` [DESIGN-${change.designId}]` : ''}\n`;
    });
    notes += '\n';
  }

  // Bug Fixes
  const fixes = changesets.filter(c => c.type === 'patch');
  if (fixes.length > 0) {
    notes += '## 🐛 Bug Fixes\n\n';
    fixes.forEach(change => {
      notes += `- ${change.description}${change.designId ? ` [DESIGN-${change.designId}]` : ''}\n`;
    });
    notes += '\n';
  }

  // Design Updates
  const designUpdates = changesets.filter(c => c.designId);
  if (designUpdates.length > 0) {
    notes += '## 🎨 Design Updates\n\n';
    designUpdates.forEach(change => {
      notes += `- [DESIGN-${change.designId}] ${change.description}\n`;
    });
    notes += '\n';
  }

  // Component Changes
  const componentChanges = new Map<string, Changeset[]>();
  changesets.forEach(change => {
    if (change.component) {
      if (!componentChanges.has(change.component)) {
        componentChanges.set(change.component, []);
      }
      componentChanges.get(change.component)?.push(change);
    }
  });

  if (componentChanges.size > 0) {
    notes += '## 🔄 Component Changes\n\n';
    componentChanges.forEach((changes, component) => {
      notes += `### ${component}\n\n`;
      changes.forEach(change => {
        notes += `- ${change.description}${change.designId ? ` [DESIGN-${change.designId}]` : ''}\n`;
      });
      notes += '\n';
    });
  }

  return notes;
}

// Generate and save release notes
const notes = generateReleaseNotes();
fs.writeFileSync('RELEASE_NOTES.md', notes);

console.log('Release notes generated successfully!'); 