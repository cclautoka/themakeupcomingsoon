import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuration for robots.txt generation
 */
const config = {
  siteUrl: 'https://themakeupacademyfiji.com',
  sitemap: 'https://themakeupacademyfiji.com/sitemap.xml',
  
  // Paths to disallow for all bots
  disallowPaths: [
    '/api/',
    '/admin/',
    '/*.json$',
    '/*.zip$',
    '/node_modules/',
  ],
  
  // Paths to allow (override disallow)
  allowPaths: [
    '/',
    '/public/',
  ],
  
  // Crawl delay for specific bots (in seconds)
  crawlDelays: {
    '*': 1,
    'Googlebot': 0,
    'Bingbot': 1,
  },
  
  // Specific rules for different user agents
  specificRules: {
    'GPTBot': {
      disallow: ['/'],
      comment: 'Block AI training bots'
    },
    'ChatGPT-User': {
      disallow: ['/'],
      comment: 'Block AI training bots'
    },
    'CCBot': {
      disallow: ['/'],
      comment: 'Block Common Crawl bot'
    },
    'anthropic-ai': {
      disallow: ['/'],
      comment: 'Block AI training bots'
    },
    'Claude-Web': {
      disallow: ['/'],
      comment: 'Block AI training bots'
    },
  }
};

/**
 * Generate robots.txt content
 */
function generateRobotsTxt() {
  let content = '# robots.txt for The Make Up Academy Fiji\n';
  content += `# Generated: ${new Date().toISOString()}\n\n`;
  
  // Specific user agent rules
  Object.entries(config.specificRules).forEach(([userAgent, rules]) => {
    if (rules.comment) {
      content += `# ${rules.comment}\n`;
    }
    content += `User-agent: ${userAgent}\n`;
    rules.disallow.forEach(path => {
      content += `Disallow: ${path}\n`;
    });
    content += '\n';
  });
  
  // General rules for all other bots
  content += '# General rules for all bots\n';
  content += 'User-agent: *\n';
  
  // Allow paths
  config.allowPaths.forEach(path => {
    content += `Allow: ${path}\n`;
  });
  
  // Disallow paths
  config.disallowPaths.forEach(path => {
    content += `Disallow: ${path}\n`;
  });
  
  // Crawl delay
  if (config.crawlDelays['*']) {
    content += `Crawl-delay: ${config.crawlDelays['*']}\n`;
  }
  
  content += '\n';
  
  // Specific bot crawl delays
  Object.entries(config.crawlDelays).forEach(([bot, delay]) => {
    if (bot !== '*') {
      content += `User-agent: ${bot}\n`;
      content += `Crawl-delay: ${delay}\n`;
      content += '\n';
    }
  });
  
  // Sitemap
  content += `# Sitemap\n`;
  content += `Sitemap: ${config.sitemap}\n`;
  
  return content;
}

/**
 * Write robots.txt to public directory
 */
function writeRobotsTxt() {
  const content = generateRobotsTxt();
  const publicDir = path.join(__dirname, '../public');
  const robotsPath = path.join(publicDir, 'robots.txt');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write robots.txt
  fs.writeFileSync(robotsPath, content, 'utf8');
  console.log('✅ robots.txt generated successfully!');
  console.log(`📍 Location: ${robotsPath}`);
  console.log(`📊 Size: ${content.length} bytes`);
  
  // Display content
  console.log('\n📄 Content:\n');
  console.log(content);
}

// Run the script
try {
  writeRobotsTxt();
} catch (error) {
  console.error('❌ Error generating robots.txt:', error);
  process.exit(1);
}

