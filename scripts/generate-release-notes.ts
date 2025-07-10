import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ChangesetInfo {
  id: string;
  type: 'major' | 'minor' | 'patch';
  description: string;
  packages: string[];
}

async function generateReleaseNotes() {
  const changesetDir = path.join(__dirname, '../.changeset');
  const files = fs.readdirSync(changesetDir);
  const changesets: ChangesetInfo[] = [];

  for (const file of files) {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(changesetDir, file), 'utf8');
      const lines = content.split('\n');
      
      // Simple parsing of changeset files
      const changeset: Partial<ChangesetInfo> = {
        id: file.replace('.md', ''),
        packages: []
      };
      
      let inDescription = false;
      let description = '';
      
      for (const line of lines) {
        if (line.startsWith('---')) {
          inDescription = !inDescription;
          continue;
        }
        
        if (inDescription) {
          description += line + '\n';
        } else if (line.includes(':')) {
          const [pkg, type] = line.split(':').map(s => s.trim());
          changeset.packages = changeset.packages || [];
          changeset.packages.push(pkg);
          changeset.type = type as 'major' | 'minor' | 'patch';
        }
      }
      
      changeset.description = description.trim();
      changesets.push(changeset as ChangesetInfo);
    }
  }

  // Generate markdown
  let markdown = '# Release Notes\n\n';
  
  for (const changeset of changesets) {
    markdown += `## ${changeset.type.toUpperCase()} Changes\n\n`;
    markdown += `### Packages Affected\n`;
    for (const pkg of changeset.packages) {
      markdown += `- ${pkg}\n`;
    }
    markdown += `\n### Description\n${changeset.description}\n\n`;
  }

  // Write to file
  fs.writeFileSync(path.join(__dirname, '../RELEASE_NOTES.md'), markdown);
  console.log('Release notes generated successfully!');
}

// Run if this is the entry point
if (import.meta.url.endsWith(process.argv[1])) {
  generateReleaseNotes().catch(console.error);
}

export default generateReleaseNotes; 