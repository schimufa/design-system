import fs from 'fs';
import path from 'path';

interface NotificationConfig {
  slack: {
    webhook: string;
    channel: string;
  };
  email: {
    recipients: string[];
    from: string;
  };
}

async function sendSlackNotification(
  version: string,
  notes: string,
  config: NotificationConfig
) {
  const message = {
    channel: config.slack.channel,
    text: `🎉 Design System v${version} Released!`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `🎉 Design System v${version} Released!`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: notes,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Links:*\n• <https://github.com/your-org/design-system/releases|Release Notes>\n• <https://your-org.github.io/design-system|Storybook>\n• <https://www.figma.com/file/your-design-file|Design Specs>',
        },
      },
    ],
  };

  // In a real implementation, you would use the Slack Web API to send this message
  console.log(
    'Slack notification would be sent:',
    JSON.stringify(message, null, 2)
  );
}

async function sendEmailNotification(
  version: string,
  notes: string,
  config: NotificationConfig
) {
  const email = {
    from: config.email.from,
    to: config.email.recipients,
    subject: `Design System v${version} Released`,
    html: `
      <h1>Design System v${version} Released</h1>
      <div>${notes.replace(/\n/g, '<br>')}</div>
      <h2>Links</h2>
      <ul>
        <li><a href="https://github.com/your-org/design-system/releases">Release Notes</a></li>
        <li><a href="https://your-org.github.io/design-system">Storybook</a></li>
        <li><a href="https://www.figma.com/file/your-design-file">Design Specs</a></li>
      </ul>
    `,
  };

  // In a real implementation, you would use a mail service like nodemailer
  console.log(
    'Email notification would be sent:',
    JSON.stringify(email, null, 2)
  );
}

async function notifyStakeholders() {
  // Read release notes
  const notes = fs.readFileSync(
    path.join(process.cwd(), 'RELEASE_NOTES.md'),
    'utf-8'
  );

  // Read package.json for version
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
  );

  // Read config (in real implementation, this would be in a separate config file)
  const config: NotificationConfig = {
    slack: {
      webhook: 'https://hooks.slack.com/services/your-webhook-url',
      channel: '#design-system',
    },
    email: {
      recipients: ['design-system@your-org.com', 'engineering@your-org.com'],
      from: 'design-system-bot@your-org.com',
    },
  };

  // Send notifications
  await Promise.all([
    sendSlackNotification(pkg.version, notes, config),
    sendEmailNotification(pkg.version, notes, config),
  ]);

  console.log('✅ All notifications sent successfully!');
}

// Run if this is the entry point
if (require.main === module) {
  notifyStakeholders().catch(console.error);
}

export default notifyStakeholders;
