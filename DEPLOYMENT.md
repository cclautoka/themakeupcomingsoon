# Deployment Guide for Railway

## The Problem

Your production site was missing all meta tags, Open Graph tags, and SEO elements because Railway wasn't properly configured to build and serve your static React site.

## The Solution

We've added proper Railway configuration to ensure your site builds correctly and serves all meta tags.

## Files Added/Updated

### 1. `railway.toml`
Railway configuration file that tells Railway:
- How to build the project (`npm run build`)
- How to serve the site (`serve dist -s -l 3000`)
- Which builder to use (nixpacks with Node.js)

### 2. `package.json`
- Added `serve` dependency to serve static files
- Added `start` script: `serve dist -s -l 3000`

## What Railway Will Do Now

1. **Build Phase:**
   - Run `npm install` to install dependencies
   - Run `npm run build` which:
     - Generates robots.txt automatically
     - Builds the React app with Vite
     - Creates the `dist/` folder with all meta tags preserved

2. **Deploy Phase:**
   - Run `npm start` which serves the `dist/` folder
   - The `-s` flag enables SPA mode (single-page app)
   - The `-l 3000` flag sets the port to 3000

## Verification After Deployment

Once Railway redeploys, verify that your meta tags are present:

1. **Check Page Source:**
   ```
   View source: https://themakeupacademyfiji.com
   ```
   You should see all these sections:
   - Meta description
   - Meta keywords
   - Open Graph tags
   - Twitter Card tags
   - Structured Data (JSON-LD)

2. **Test with Google:**
   - Go to Google Search Console
   - Use "URL Inspection Tool"
   - Enter: `https://themakeupacademyfiji.com`
   - Click "Test Live URL"
   - View the rendered HTML to confirm meta tags are present

3. **Test SEO Tags:**
   - **Facebook Debugger:** https://developers.facebook.com/tools/debug/
   - **Twitter Card Validator:** https://cards-dev.twitter.com/validator
   - **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

## Expected Results

### Before (Broken):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>The Make Up Academy Fiji</title>
    <!-- Missing all meta tags! -->
  </head>
```

### After (Fixed):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="The Make Up Academy Fiji - Premier beauty training..." />
    <meta name="keywords" content="makeup artist Nadi Fiji, bridal makeup..." />
    <meta property="og:title" content="The Make Up Academy Fiji | Professional Makeup Training in Nadi" />
    <meta property="og:image" content="https://themakeupacademyfiji.com/logo.jpg" />
    <!-- All 50+ meta tags present! -->
    <title>The Make Up Academy Fiji | Expert Beauty Training | Nadi Back Road</title>
  </head>
```

## Deployment Steps

1. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Fix Railway deployment configuration for meta tags"
   git push
   ```

2. **Railway will automatically:**
   - Detect the push
   - Read `railway.toml`
   - Run build command
   - Deploy with start command

3. **Wait 2-3 minutes** for Railway to build and deploy

4. **Test the live site** (see Verification section above)

## Troubleshooting

### If meta tags still don't appear:

1. **Check Railway Logs:**
   - Go to Railway dashboard
   - Click on your service
   - View "Deploy Logs"
   - Ensure build completes successfully

2. **Verify Build Output:**
   - Logs should show: `✅ robots.txt generated successfully!`
   - Logs should show: `✓ built in XXXms`

3. **Check Environment:**
   - Railway should detect Node.js automatically
   - Build command: `npm run build`
   - Start command: `npm start`

4. **Manual Verification:**
   - SSH into Railway container (if needed)
   - Check if `dist/index.html` exists
   - Verify `dist/index.html` contains all meta tags

### If Railway doesn't detect railway.toml:

1. In Railway dashboard, go to Settings
2. Set Build Command: `npm run build`
3. Set Start Command: `npm start`
4. Save and redeploy

## Why This Works

- **`serve`** is a production-ready static file server
- The `-s` flag rewrites all routes to `/index.html` (for React Router)
- The `-l 3000` sets the port (Railway can map this to HTTPS)
- **Vite** properly processes `index.html` and preserves all meta tags
- **Railway.toml** ensures consistent builds across deployments

## Support

If you still have issues after deployment:
1. Check Railway logs for errors
2. Verify the dist/index.html locally has all meta tags
3. Test with different browsers
4. Clear Railway cache and redeploy
5. Contact Railway support if the issue persists

---

**Last Updated:** November 10, 2025
**Status:** Ready for deployment ✅

