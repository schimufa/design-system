#!/usr/bin/env node

/**
 * Design System Version Checker CLI
 * 
 * Usage:
 *   node scripts/version-checker.js
 *   npm run check-version
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

function log(message, color = 'reset') {
    console.log(colorize(message, color));
}

function logSection(title) {
    console.log('\n' + colorize('='.repeat(50), 'cyan'));
    console.log(colorize(title, 'bright'));
    console.log(colorize('='.repeat(50), 'cyan'));
}

async function getCurrentVersion() {
    try {
        const packagePath = path.join(__dirname, '../package.json');
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        return packageJson.version;
    } catch (error) {
        log('❌ Could not read package.json', 'red');
        return null;
    }
}

async function getLatestVersionFromNPM() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'registry.npmjs.org',
            path: '/@schimufa/design-system',
            method: 'GET',
            headers: {
                'User-Agent': 'design-system-version-checker'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const packageInfo = JSON.parse(data);
                    resolve({
                        latest: packageInfo['dist-tags'].latest,
                        versions: Object.keys(packageInfo.versions).reverse(),
                        publishedAt: packageInfo.time[packageInfo['dist-tags'].latest],
                        description: packageInfo.description,
                        homepage: packageInfo.homepage,
                    });
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

function compareVersions(current, latest) {
    const currentParts = current.split('.').map(Number);
    const latestParts = latest.split('.').map(Number);

    for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
        const currentPart = currentParts[i] || 0;
        const latestPart = latestParts[i] || 0;

        if (currentPart < latestPart) return -1;
        if (currentPart > latestPart) return 1;
    }

    return 0;
}

function getVersionType(current, latest) {
    const currentParts = current.split('.').map(Number);
    const latestParts = latest.split('.').map(Number);

    if (latestParts[0] > currentParts[0]) return 'major';
    if (latestParts[1] > currentParts[1]) return 'minor';
    if (latestParts[2] > currentParts[2]) return 'patch';

    return 'none';
}

function displayVersionInfo(current, npmInfo) {
    logSection('📦 VERSION INFORMATION');

    log(`Current version: ${colorize(current, 'blue')}`, 'reset');
    log(`Latest version:  ${colorize(npmInfo.latest, 'green')}`, 'reset');
    log(`Published:       ${colorize(new Date(npmInfo.publishedAt).toLocaleDateString(), 'yellow')}`, 'reset');

    const comparison = compareVersions(current, npmInfo.latest);
    const versionType = getVersionType(current, npmInfo.latest);

    if (comparison < 0) {
        log(`\n🎉 ${colorize('New version available!', 'green')}`, 'reset');
        log(`Update type: ${colorize(versionType.toUpperCase(), versionType === 'major' ? 'red' : versionType === 'minor' ? 'yellow' : 'green')}`, 'reset');
    } else if (comparison === 0) {
        log(`\n✅ ${colorize('You have the latest version!', 'green')}`, 'reset');
    } else {
        log(`\n🚀 ${colorize('You have a pre-release version!', 'magenta')}`, 'reset');
    }
}

function displayUpdateInstructions(current, latest) {
    const comparison = compareVersions(current, latest);

    if (comparison >= 0) return;

    logSection('🚀 UPDATE INSTRUCTIONS');

    log('To update the design system:', 'bright');
    log('', 'reset');
    log('  npm update @schimufa/design-system', 'cyan');
    log('  # or', 'reset');
    log('  pnpm update @schimufa/design-system', 'cyan');
    log('  # or', 'reset');
    log('  yarn upgrade @schimufa/design-system', 'cyan');

    const versionType = getVersionType(current, latest);

    if (versionType === 'major') {
        log('\n⚠️  MAJOR VERSION UPDATE', 'red');
        log('This update may contain breaking changes.', 'yellow');
        log('Please review the migration guide before updating.', 'yellow');
    } else if (versionType === 'minor') {
        log('\n✨ MINOR VERSION UPDATE', 'yellow');
        log('This update includes new features and improvements.', 'green');
        log('Should be backward compatible.', 'green');
    } else {
        log('\n🔧 PATCH VERSION UPDATE', 'green');
        log('This update includes bug fixes and improvements.', 'green');
        log('Safe to update.', 'green');
    }
}

function displayDocumentationLinks() {
    logSection('📚 DOCUMENTATION & RESOURCES');

    const links = [
        { name: 'Storybook (Local)', url: 'http://localhost:6006', description: 'Interactive component documentation' },
        { name: 'GitHub Repository', url: 'https://github.com/schimufa/design-system', description: 'Source code and issues' },
        { name: 'NPM Package', url: 'https://www.npmjs.com/package/@schimufa/design-system', description: 'Package information' },
        { name: 'Release Notes', url: 'https://github.com/schimufa/design-system/releases', description: 'Detailed release information' },
        { name: 'Changelog', url: 'https://github.com/schimufa/design-system/blob/main/packages/design-system/CHANGELOG.md', description: 'Version history' },
    ];

    links.forEach(link => {
        log(`${colorize(link.name, 'blue')}: ${link.url}`, 'reset');
        log(`  ${colorize(link.description, 'reset')}`, 'reset');
        log('', 'reset');
    });
}

function displayAvailableVersions(versions) {
    logSection('📋 AVAILABLE VERSIONS');

    log('Recent versions (latest 10):', 'bright');
    log('', 'reset');

    versions.slice(0, 10).forEach((version, index) => {
        const isLatest = index === 0;
        const color = isLatest ? 'green' : 'reset';
        const marker = isLatest ? '👑 ' : '   ';
        log(`${marker}${colorize(version, color)}${isLatest ? ' (latest)' : ''}`, 'reset');
    });

    if (versions.length > 10) {
        log(`\n... and ${versions.length - 10} more versions`, 'reset');
    }
}

function displayUsageExamples() {
    logSection('💡 USAGE EXAMPLES');

    log('Check for updates in your project:', 'bright');
    log('  npm outdated @schimufa/design-system', 'cyan');
    log('', 'reset');

    log('Get package information:', 'bright');
    log('  npm info @schimufa/design-system', 'cyan');
    log('', 'reset');

    log('Install specific version:', 'bright');
    log('  npm install @schimufa/design-system@4.0.1', 'cyan');
    log('', 'reset');

    log('Run Storybook locally:', 'bright');
    log('  cd packages/design-system && pnpm dev', 'cyan');
    log('', 'reset');
}

async function main() {
    log(colorize('🎨 Design System Version Checker', 'bright'));
    log('', 'reset');

    try {
        // Get current version
        const currentVersion = await getCurrentVersion();
        if (!currentVersion) {
            log('❌ Could not determine current version', 'red');
            process.exit(1);
        }

        // Get NPM information
        log('🔍 Checking NPM registry...', 'yellow');
        const npmInfo = await getLatestVersionFromNPM();

        // Display information
        displayVersionInfo(currentVersion, npmInfo);
        displayUpdateInstructions(currentVersion, npmInfo.latest);
        displayAvailableVersions(npmInfo.versions);
        displayDocumentationLinks();
        displayUsageExamples();

        log('\n' + colorize('✨ Happy coding with the design system!', 'green'));

    } catch (error) {
        log('\n❌ Error checking version information:', 'red');
        log(error.message, 'red');

        if (error.code === 'ENOTFOUND') {
            log('\n💡 This might be due to network connectivity issues.', 'yellow');
            log('Please check your internet connection and try again.', 'yellow');
        }

        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = {
    getCurrentVersion,
    getLatestVersionFromNPM,
    compareVersions,
    getVersionType,
};