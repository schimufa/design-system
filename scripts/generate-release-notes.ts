import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

interface Changeset {
  id: string;
  type: 'major' | 'minor' | 'patch';
  description: string;
  package: string;
  breaking?: boolean;
  migration?: string[];
}

class ReleaseNotesGenerator {
  private changesetPath: string;
  private outputPath: string;

  constructor() {
    this.changesetPath = path.join(process.cwd(), '.changeset');
    this.outputPath = path.join(process.cwd(), 'RELEASE_NOTES.md');
  }

  private async getChangesets(): Promise<Changeset[]> {
    const files = fs.readdirSync(this.changesetPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');

    return files.map(file => {
      const content = fs.readFileSync(path.join(this.changesetPath, file), 'utf8');
      // Parse changeset content
      // This is a simplified version - in production, use proper MD parser
      const [metadata, ...description] = content.split('---\n');
      
      return {
        id: file.replace('.md', ''),
        type: 'minor', // Parse from metadata
        description: description.join('').trim(),
        package: '@schimufa/design-system', // Parse from metadata
        breaking: description.join('').includes('BREAKING CHANGE'),
        migration: this.extractMigrationSteps(description.join('')),
      };
    });
  }

  private extractMigrationSteps(content: string): string[] {
    const migrationMatch = content.match(/## Migration([\s\S]*?)(?:##|$)/);
    if (!migrationMatch) return [];
    
    return migrationMatch[1]
      .trim()
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.slice(2).trim());
  }

  private categorizeChanges(changesets: Changeset[]): Record<string, Changeset[]> {
    return changesets.reduce((acc, changeset) => {
      if (changeset.breaking) {
        acc.breaking = [...(acc.breaking || []), changeset];
      } else if (changeset.type === 'minor') {
        acc.features = [...(acc.features || []), changeset];
      } else {
        acc.fixes = [...(acc.fixes || []), changeset];
      }
      return acc;
    }, {} as Record<string, Changeset[]>);
  }

  private generateMarkdown(categorized: Record<string, Changeset[]>): string {
    const date = new Date().toISOString().split('T')[0];
    let markdown = `# Release Notes (${date})\n\n`;

    if (categorized.breaking?.length) {
      markdown += '## ⚠️ Breaking Changes\n\n';
      categorized.breaking.forEach(change => {
        markdown += `### ${change.description}\n\n`;
        if (change.migration?.length) {
          markdown += '**Migration Steps:**\n';
          change.migration.forEach(step => {
            markdown += `- ${step}\n`;
          });
          markdown += '\n';
        }
      });
    }

    if (categorized.features?.length) {
      markdown += '## ✨ New Features\n\n';
      categorized.features.forEach(change => {
        markdown += `- ${change.description}\n`;
      });
      markdown += '\n';
    }

    if (categorized.fixes?.length) {
      markdown += '## 🐛 Bug Fixes\n\n';
      categorized.fixes.forEach(change => {
        markdown += `- ${change.description}\n`;
      });
      markdown += '\n';
    }

    markdown += '## 📦 Packages\n\n';
    markdown += '| Package | Version | Changes |\n';
    markdown += '|---------|----------|----------|\n';
    markdown += `| @schimufa/design-system | ${this.getPackageVersion()} | ${this.countChanges(categorized)} changes |\n\n`;

    return markdown;
  }

  private getPackageVersion(): string {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'packages/design-system/package.json'), 'utf8')
    );
    return packageJson.version;
  }

  private countChanges(categorized: Record<string, Changeset[]>): number {
    return Object.values(categorized).reduce((acc, changes) => acc + changes.length, 0);
  }

  public async generate(): Promise<void> {
    console.log(chalk.blue('Generating release notes...'));
    
    const changesets = await this.getChangesets();
    const categorized = this.categorizeChanges(changesets);
    const markdown = this.generateMarkdown(categorized);
    
    fs.writeFileSync(this.outputPath, markdown);
    
    console.log(chalk.green('\nRelease notes generated successfully!'));
    console.log(chalk.gray(`Output: ${this.outputPath}`));
  }
}

// Run generator if called directly
if (require.main === module) {
  const generator = new ReleaseNotesGenerator();
  generator.generate().catch(console.error);
}

export default ReleaseNotesGenerator; 