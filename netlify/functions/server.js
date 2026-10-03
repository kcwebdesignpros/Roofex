/**
 * Netlify Function entry point.
 *
 * Netlify does not run a long-lived Node process, so the Express app is wrapped
 * with `serverless-http` and exposed as a single catch-all function. `netlify.toml`
 * rewrites every non-static route here; files in the publish directory (css, js, img)
 * are served straight from Netlify's CDN before the rewrite applies.
 */

const serverless = require('serverless-http');
const app = require('../../server');

module.exports.handler = serverless(app);
