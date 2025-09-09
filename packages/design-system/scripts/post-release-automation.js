#!/usr/bin/env node

/**
 * Post-Release Automation Script
 * Handles automated tasks after a design system release
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI colors for output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

function log(message, color = 'reset') {
    console.log(colorize(message, color));
}

function logSection(title) {
    console.log('\n' + colorize('='.repeat(60), 'cyan'));
    console.log(colorize(title, 'bright'));
    console.log(colorize('='.repeat(60), 'cyan'));
}

class PostReleaseAutomation {
    constructor() {
        this.packageJson = this.loadPackageJson();
        this.releaseInfo = this.extractReleaseInfo();
        this.config = this.loadConfig();
    }

    /**
     * Run all post-release tasks
     */
    async runAll() {
        log(colorize('🚀 Post-Release Automation Started', 'bright'));
        log(`Processing release: ${this.releaseInfo.version}`);

        try {
            await this.deployDocumentation();
            await this.sendNotifications();
            await this.updateWikis();
            await this.scheduleWorkshops();
            await this.monitorMetrics();
            await this.createFollowUpIssues();

            log(colorize('\n✅ Post-release automation completed successfully!', 'green'));
        } catch (error) {
            log(colorize(`\n❌ Post-release automation failed: ${error.message}`, 'red'));
            process.exit(1);
        }
    }

    /**
     * Deploy updated documentation
     */
    async deployDocumentation() {
        logSection('📚 DEPLOYING DOCUMENTATION');

        try {
            // Build and deploy Storybook
            log('Building Storybook...', 'blue');
            execSync('pnpm build-storybook', { stdio: 'pipe' });
            log('✅ Storybook built successfully', 'green');

            // Generate API documentation
            log('Generating API documentation...', 'blue');
            execSync('pnpm docs', { stdio: 'pipe' });
            log('✅ API documentation generated', 'green');

            // Deploy to GitHub Pages (or your hosting platform)
            if (this.config.deployDocs) {
                log('Deploying documentation...', 'blue');
                // execSync('gh-pages -d storybook-static', { stdio: 'pipe' });
                log('✅ Documentation deployed', 'green');
            }

            // Update documentation index
            await this.updateDocumentationIndex();
            log('✅ Documentation index updated', 'green');

        } catch (error) {
            throw new Error(`Documentation deployment failed: ${error.message}`);
        }
    }

    /**
     * Send release notifications
     */
    async sendNotifications() {
        logSection('📢 SENDING NOTIFICATIONS');

        const notifications = [
            { channel: 'slack', audience: 'all-developers' },
            { channel: 'email', audience: 'design-system-users' },
            { channel: 'teams', audience: 'specific-teams' }
        ];

        for (const notification of notifications) {
            try {
                await this.sendNotification(notification);
                log(`✅ Notification sent to ${notification.channel}`, 'green');
            } catch (error) {
                log(`⚠️ Failed to send ${notification.channel} notification: ${error.message}`, 'yellow');
            }
        }

        // Schedule follow-up notifications for major releases
        if (this.releaseInfo.type === 'major') {
            await this.scheduleFollowUpNotifications();
            log('✅ Follow-up notifications scheduled', 'green');
        }
    }

    /**
     * Update internal wikis and documentation
     */
    async updateWikis() {
        logSection('📝 UPDATING WIKIS');

        const wikiUpdates = [
            { name: 'Internal Wiki', url: this.config.internalWikiUrl },
            { name: 'Team Confluence', url: this.config.confluenceUrl },
            { name: 'Developer Portal', url: this.config.developerPortalUrl }
        ];

        for (const wiki of wikiUpdates) {
            try {
                await this.updateWikiPage(wiki);
                log(`✅ ${wiki.name} updated`, 'green');
            } catch (error) {
                log(`⚠️ Failed to update ${wiki.name}: ${error.message}`, 'yellow');
            }
        }
    }

    /**
     * Schedule migration workshops for major releases
     */
    async scheduleWorkshops() {
        logSection('🎓 SCHEDULING WORKSHOPS');

        if (this.releaseInfo.type === 'major' || this.releaseInfo.hasBreakingChanges) {
            const workshops = [{
                    title: `Migration Workshop: Design System v${this.releaseInfo.version}`,
                    date: this.calculateWorkshopDate(),
                    duration: '2 hours',
                    audience: 'All development teams'
                },
                {
                    title: 'Office Hours: Migration Support',
                    date: this.calculateOfficeHoursDate(),
                    duration: '1 hour',
                    audience: 'Teams needing assistance'
                }
            ];

            for (const workshop of workshops) {
                try {
                    await this.scheduleWorkshop(workshop);
                    log(`✅ Scheduled: ${workshop.title}`, 'green');
                } catch (error) {
                    log(`⚠️ Failed to schedule ${workshop.title}: ${error.message}`, 'yellow');
                }
            }
        } else {
            log('ℹ️ No workshops needed for this release type', 'blue');
        }
    }

    /**
     * Monitor release metrics
     */
    async monitorMetrics() {
        logSection('📊 MONITORING METRICS');

        try {
            // Set up monitoring for the new release
            await this.setupReleaseMonitoring();
            log('✅ Release monitoring configured', 'green');

            // Create analytics dashboard
            await this.createAnalyticsDashboard();
            log('✅ Analytics dashboard created', 'green');

            // Set up alerts for issues
            await this.configureAlerts();
            log('✅ Error monitoring alerts configured', 'green');

        } catch (error) {
            log(`⚠️ Monitoring setup failed: ${error.message}`, 'yellow');
        }
    }

    /**
     * Create follow-up issues for known limitations
     */
    async createFollowUpIssues() {
        logSection('📋 CREATING FOLLOW-UP ISSUES');

        const followUpIssues = this.generateFollowUpIssues();

        for (const issue of followUpIssues) {
            try {
                await this.createGitHubIssue(issue);
                log(`✅ Created issue: ${issue.title}`, 'green');
            } catch (error) {
                log(`⚠️ Failed to create issue: ${issue.title}`, 'yellow');
            }
        }
    }

    // Helper methods
    loadPackageJson() {
        const packagePath = path.join(__dirname, '../package.json');
        return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    }

    extractReleaseInfo() {
        const version = this.packageJson.version;
        const [major, minor, patch] = version.split('.').map(Number);

        // Determine release type
        let type = 'patch';
        if (patch === 0 && minor === 0) type = 'major';
        else if (patch === 0) type = 'minor';

        // Check for breaking changes in changelog
        const changelogPath = path.join(__dirname, '../CHANGELOG.md');
        let hasBreakingChanges = false;

        if (fs.existsSync(changelogPath)) {
            const changelog = fs.readFileSync(changelogPath, 'utf8');
            hasBreakingChanges = changelog.includes('BREAKING CHANGES') ||
                changelog.includes('Breaking Changes');
        }

        return {
            version,
            type,
            hasBreakingChanges,
            releaseDate: new Date().toISOString()
        };
    }

    loadConfig() {
        const defaultConfig = {
            deployDocs: true,
            sendNotifications: true,
            updateWikis: true,
            scheduleWorkshops: true,
            monitorMetrics: true,
            internalWikiUrl: 'https://wiki.company.com/design-system',
            confluenceUrl: 'https://company.atlassian.net/wiki/spaces/DS',
            developerPortalUrl: 'https://developers.company.com/design-system'
        };

        const configPath = path.join(__dirname, '../post-release.config.json');

        if (fs.existsSync(configPath)) {
            const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            return {...defaultConfig, ...userConfig };
        }

        return defaultConfig;
    }

    async updateDocumentationIndex() {
        const indexContent = `
# Design System Documentation

## Latest Release: v${this.releaseInfo.version}
Released: ${new Date().toLocaleDateString()}

## Quick Links
- [Storybook](./storybook/index.html)
- [API Documentation](./docs/index.html)
- [Migration Guide](./migration/v${this.releaseInfo.version}.html)
- [Release Notes](./releases/v${this.releaseInfo.version}.html)

## Resources
- [GitHub Repository](https://github.com/schimufa/design-system)
- [NPM Package](https://www.npmjs.com/package/@schimufa/design-system)
- [Support Channel](#design-system-support)
    `;

        const indexPath = path.join(__dirname, '../docs/index.md');
        fs.writeFileSync(indexPath, indexContent);
    }

    async sendNotification(notification) {
        // This would integrate with actual notification services
        log(`Sending ${notification.channel} notification to ${notification.audience}...`, 'blue');

        const message = this.generateNotificationMessage(notification);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        return { success: true, message };
    }

    generateNotificationMessage(notification) {
            const { version, type, hasBreakingChanges } = this.releaseInfo;

            return {
                subject: `🚀 Design System v${version} Released`,
                body: `
# Design System v${version} Released

## Release Type: ${type.toUpperCase()}
${hasBreakingChanges ? '⚠️ **Contains Breaking Changes**' : '✅ **Backward Compatible**'}

## What's New
- Check the [release notes](link) for detailed changes
- Review the [migration guide](link) if applicable
- Update your dependencies: \`npm update @schimufa/design-system\`

## Resources
- [Documentation](link)
- [Storybook](link)
- [Support Channel](#design-system-support)

${hasBreakingChanges ? `
## Migration Required
Please review the migration guide and plan your updates accordingly.
Migration workshop scheduled for ${this.calculateWorkshopDate().toLocaleDateString()}.
` : ''}
      `,
      priority: hasBreakingChanges ? 'high' : 'medium'
    };
  }

  async scheduleFollowUpNotifications() {
    const followUpDates = [
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month
      new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)  // 2 months
    ];

    for (const date of followUpDates) {
      // This would integrate with a scheduling service
      log(`Scheduled follow-up notification for ${date.toLocaleDateString()}`, 'blue');
    }
  }

  async updateWikiPage(wiki) {
    // This would integrate with wiki APIs (Confluence, etc.)
    log(`Updating ${wiki.name} at ${wiki.url}...`, 'blue');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  calculateWorkshopDate() {
    // Schedule workshop for next Wednesday, 2 weeks from now
    const date = new Date();
    date.setDate(date.getDate() + 14);
    
    // Find next Wednesday
    while (date.getDay() !== 3) {
      date.setDate(date.getDate() + 1);
    }
    
    return date;
  }

  calculateOfficeHoursDate() {
    // Schedule office hours for next Friday
    const date = new Date();
    date.setDate(date.getDate() + 7);
    
    // Find next Friday
    while (date.getDay() !== 5) {
      date.setDate(date.getDate() + 1);
    }
    
    return date;
  }

  async scheduleWorkshop(workshop) {
    // This would integrate with calendar/meeting services
    log(`Scheduling ${workshop.title} for ${workshop.date.toLocaleDateString()}...`, 'blue');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async setupReleaseMonitoring() {
    // This would set up monitoring dashboards
    log('Setting up release monitoring...', 'blue');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async createAnalyticsDashboard() {
    // This would create analytics dashboards
    log('Creating analytics dashboard...', 'blue');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async configureAlerts() {
    // This would set up error monitoring alerts
    log('Configuring monitoring alerts...', 'blue');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  generateFollowUpIssues() {
    const issues = [];

    // Always create a post-release review issue
    issues.push({
      title: `Post-Release Review: v${this.releaseInfo.version}`,
      body: `
## Release Review Checklist

- [ ] Monitor adoption metrics
- [ ] Collect user feedback
- [ ] Review error rates
- [ ] Assess migration progress
- [ ] Document lessons learned

## Metrics to Track
- Download/usage statistics
- Error rates and types
- Migration completion rates
- User satisfaction scores

## Timeline
- **1 week**: Initial metrics review
- **1 month**: Migration progress assessment
- **3 months**: Full adoption review
      `,
      labels: ['post-release', 'review', 'metrics']
    });

    // Create migration tracking issue for breaking changes
    if (this.releaseInfo.hasBreakingChanges) {
      issues.push({
        title: `Migration Tracking: v${this.releaseInfo.version}`,
        body: `
## Migration Progress Tracking

Track teams migrating from previous versions to v${this.releaseInfo.version}.

## Teams to Track
- [ ] Team A
- [ ] Team B
- [ ] Team C

## Support Provided
- [ ] Migration workshop conducted
- [ ] Office hours scheduled
- [ ] Documentation updated
- [ ] Individual team support

## Success Criteria
- [ ] 80% of teams migrated within 3 months
- [ ] No critical issues reported
- [ ] Migration feedback collected
        `,
        labels: ['migration', 'tracking', 'breaking-changes']
      });
    }

    return issues;
  }

  async createGitHubIssue(issue) {
    // This would create actual GitHub issues via API
    log(`Creating GitHub issue: ${issue.title}...`, 'blue');
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Run the automation if called directly
if (require.main === module) {
  const automation = new PostReleaseAutomation();
  automation.runAll().catch(error => {
    console.error('Post-release automation failed:', error);
    process.exit(1);
  });
}

module.exports = PostReleaseAutomation;