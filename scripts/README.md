# Scripts Documentation

## Robots.txt Generator

### Overview
Automated script to generate and update the `robots.txt` file with SEO best practices and security rules.

### Features
- ✅ **Blocks AI training bots** (GPTBot, ChatGPT, Claude, etc.)
- ✅ **Optimizes search engine crawling** (Google, Bing, DuckDuckGo, Yahoo)
- ✅ **Configurable crawl delays** per bot
- ✅ **Protects sensitive paths** (API, admin, JSON files)
- ✅ **Includes sitemap reference**
- ✅ **Auto-generated timestamps**

### Usage

#### Generate robots.txt
```bash
npm run generate:robots
```

This will:
1. Read the configuration from `generate-robots.js`
2. Generate a comprehensive `robots.txt` file
3. Save it to the `public/` directory
4. Display the content in the console

### Configuration

Edit `scripts/generate-robots.js` to customize:

```javascript
const config = {
  siteUrl: 'https://themakeupacademyfiji.com',
  sitemap: 'https://themakeupacademyfiji.com/sitemap.xml',
  
  // Paths to block
  disallowPaths: [
    '/api/',
    '/admin/',
    '/*.json$',
    '/*.zip$',
  ],
  
  // Crawl delays (in seconds)
  crawlDelays: {
    '*': 1,          // All bots
    'Googlebot': 0,  // Google (no delay)
    'Bingbot': 1,    // Bing
  },
  
  // Block specific bots
  specificRules: {
    'GPTBot': {
      disallow: ['/'],
      comment: 'Block AI training bots'
    },
  }
};
```

### When to Regenerate

Run the script when:
- Adding new pages or sections
- Changing the sitemap URL
- Blocking new bot types
- Updating crawl delay settings
- Deploying to production

### SEO Best Practices Applied

1. **Search Engine Optimization**
   - Allows all major search engines (Google, Bing, Yahoo, DuckDuckGo)
   - No crawl delay for Googlebot (fastest indexing)
   - Minimal delay for other search engines

2. **Content Protection**
   - Blocks AI training bots from scraping content
   - Protects API endpoints and admin routes
   - Prevents indexing of JSON and ZIP files

3. **Server Load Management**
   - Crawl delays prevent server overload
   - Rate limiting per bot type

4. **Standards Compliance**
   - Follows robots.txt protocol specification
   - Includes sitemap reference
   - Clear comments for maintainability

### Current Configuration

**Allowed Bots:**
- Googlebot (Google)
- Bingbot (Bing)
- Slurp (Yahoo)
- DuckDuckBot (DuckDuckGo)
- All other legitimate crawlers

**Blocked Bots:**
- GPTBot (OpenAI)
- ChatGPT-User (OpenAI)
- Claude-Web (Anthropic)
- anthropic-ai (Anthropic)
- CCBot (Common Crawl)
- Google-Extended (Google AI training)
- Omgilibot (Content scraper)
- FacebookBot (Meta)

**Protected Paths:**
- `/api/` - API endpoints
- `/admin/` - Admin panel
- `/*.json$` - JSON files
- `/*.zip$` - Archive files
- `/node_modules/` - Dependencies

### Maintenance

To update the robots.txt after making changes:

1. Edit the configuration in `generate-robots.js`
2. Run `npm run generate:robots`
3. Commit and push the updated `public/robots.txt`
4. Deploy to production

### Testing

Verify your robots.txt:
- **Google**: [Google Search Console - robots.txt Tester](https://search.google.com/search-console)
- **Online**: https://www.searchenginejournal.com/robots-txt-tester/
- **Local**: View at `/robots.txt` when running locally

### Notes

- The script automatically adds timestamps
- Changes take effect immediately after deployment
- Search engines may take 24-48 hours to recognize updates
- Test thoroughly before deploying to production

