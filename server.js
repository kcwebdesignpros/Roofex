/**
 * Roofex — Node.js / Express website server.
 *
 *  • Server-rendered EJS pages (great for SEO + fast first paint)
 *  • Compression, cache headers and security headers
 *  • Dynamic sitemap.xml and robots.txt
 *  • JSON-LD structured data on every page
 *  • No database, no admin panel — content lives in /data
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');

const site = require('./data/site');
const services = require('./data/services');
const posts = require('./data/posts');
const projects = require('./data/projects');
const team = require('./data/team');
const S = require('./lib/schema');
const { icon } = require('./lib/icons');

/**
 * Resolve the project root that holds views/, data/, lib/, public/ and img/.
 *
 * `__dirname` is correct when running as a normal Node process, but serverless
 * bundlers (Netlify Functions, Vercel) relocate the entry file, so we probe a
 * few candidates and pick the first one that actually contains the templates.
 * APP_ROOT can override everything.
 */
function resolveRoot() {
  const candidates = [
    process.env.APP_ROOT,
    __dirname,
    path.join(__dirname, '..', '..'),
    path.join(__dirname, '..'),
    process.cwd(),
  ].filter(Boolean);

  for (const dir of candidates) {
    try {
      if (fs.existsSync(path.join(dir, 'views', 'index.ejs'))) return dir;
    } catch (e) {
      /* ignore and try the next candidate */
    }
  }
  return __dirname;
}

const ROOT = resolveRoot();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = (process.env.SITE_URL || `http://localhost:${PORT}`).replace(/\/+$/, '');

/* ------------------------------------------------------------------ *
 * App configuration
 * ------------------------------------------------------------------ */
app.set('view engine', 'ejs');
app.set('views', path.join(ROOT, 'views'));
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(compression());

/* Security + privacy headers -------------------------------------- */
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

/* Static assets ---------------------------------------------------- */
const staticOpts = (maxAge) => ({
  maxAge,
  etag: true,
  lastModified: true,
  setHeaders(res) {
    res.setHeader('Cache-Control', `public, max-age=${Math.floor(maxAge / 1000)}, immutable`);
  },
});
app.use(express.static(path.join(ROOT, 'public'), staticOpts(7 * 24 * 3600 * 1000)));
app.use('/img', express.static(path.join(ROOT, 'img'), staticOpts(30 * 24 * 3600 * 1000)));

/* Body parsing (contact form) -------------------------------------- */
app.use(express.urlencoded({ extended: false, limit: '64kb' }));

/* Helpers exposed to every template -------------------------------- */
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.services = services;
  res.locals.posts = posts;
  res.locals.recentPosts = posts.slice(0, 3);
  res.locals.baseUrl = BASE_URL;
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  res.locals.fmtDate = fmtDate;
  res.locals.icon = icon;
  res.locals.isActive = (url) =>
    url === '/' ? req.path === '/' : req.path === url || req.path.startsWith(url + '/');
  res.locals.meta = null;
  res.locals.canonical = BASE_URL + req.path;
  res.locals.schema = [];
  res.locals.bodyClass = '';
  next();
});

/* HTML caching hint (fast repeat visits, revalidated) --------------- */
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/img') && !req.path.startsWith('/assets')) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  }
  next();
});

const localBusinessSchema = () => S.localBusiness(site, BASE_URL);

/* ------------------------------------------------------------------ *
 * Routes
 * ------------------------------------------------------------------ */

// Home
app.get('/', (req, res) => {
  res.render('index', {
    meta: {
      title: `${site.name} | Roofing Contractor in ${site.address.city}, ${site.address.region} — Installation, Repair & Restoration`,
      description:
        'Roofex is a licensed, insured roofing contractor serving Kansas City and the surrounding metro. Residential and commercial roof installation, repair, inspection and 24/7 storm restoration. Free estimates.',
      keywords:
        'roofing contractor Kansas City, roof replacement Kansas City, roof repair, commercial roofing, hail damage roof repair, Roofex',
      preloadImage: '/img/hero-bg.webp',
    },
    team,
    schema: [
      localBusinessSchema(),
      S.website(site, BASE_URL),
      S.faqSchema([
        { q: 'How much does a roof replacement cost?', a: 'A typical 2,000 sq ft home with architectural shingles ranges from roughly $9,400 to $18,000 depending on pitch, layers and material. Every Roofex quote is fixed and itemised.' },
        { q: 'Do you offer free roof inspections?', a: 'Yes. Roofex provides free, no-obligation roof inspections with a full photo report and honest repair-or-replace recommendations.' },
        { q: 'Are you licensed and insured?', a: `Yes. We hold ${site.license} and carry ${site.insurance}.` },
        { q: 'How quickly can you respond to an emergency?', a: 'Our emergency line is answered 24/7 and we aim to be on site within a few hours across the Kansas City metro.' },
      ]),
    ],
  });
});

// About
app.get('/about', (req, res) => {
  res.render('about', {
    meta: {
      title: `About ${site.name} | Trusted Roofing Company Since ${site.founded}`,
      description:
        `Learn about Roofex — a family-run roofing contractor serving Kansas City since ${site.founded}. ${site.certifications.slice(0, 4).join(', ')}. Meet our team and our safety-first approach.`,
      keywords: 'about Roofex, roofing company Kansas City, certified roofers, roofing team',
    },
    team,
    schema: [
      localBusinessSchema(),
      S.breadcrumb([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }], BASE_URL),
    ],
  });
});

// Services index
app.get('/services', (req, res) => {
  res.render('services', {
    meta: {
      title: `Roofing Services in ${site.address.city}, ${site.address.region} | ${site.name}`,
      description:
        'Explore all Roofex roofing services: residential and commercial roofing, roof repair, installation and replacement, inspection and leak detection, gutters, storm damage and 24/7 emergency roofing.',
      keywords: 'roofing services Kansas City, residential roofing, commercial roofing, roof repair, roof installation',
    },
    schema: [
      localBusinessSchema(),
      S.breadcrumb([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }], BASE_URL),
      S.itemList(
        'Roofing Services',
        services.map((s) => ({ name: s.title, url: `${BASE_URL}/services/${s.slug}` }))
      ),
    ],
  });
});

// Service detail
app.get('/services/:slug', (req, res, next) => {
  const service = services.find((s) => s.slug === req.params.slug);
  if (!service) return next();

  const related = (service.related || [])
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  res.render('service', {
    service,
    related,
    meta: {
      title: service.metaTitle,
      description: service.metaDescription,
      keywords: `${service.title}, ${service.title} ${site.address.city}, roofing contractor`,
      preloadImage: service.image,
    },
    canonical: `${BASE_URL}/services/${service.slug}`,
    schema: [
      localBusinessSchema(),
      S.breadcrumb(
        [
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.title, url: `/services/${service.slug}` },
        ],
        BASE_URL
      ),
      S.serviceSchema(service, site, BASE_URL),
      S.faqSchema(service.faqs),
    ],
  });
});

// Projects
app.get('/projects', (req, res) => {
  res.render('projects', {
    projects,
    meta: {
      title: `Roofing Projects & Portfolio | Recent Roofs by ${site.name}`,
      description:
        'Browse recent Roofex roofing projects across Kansas City — residential shingle and metal installations, commercial flat roofs, storm restorations and historic slate work.',
      keywords: 'roofing projects Kansas City, roof portfolio, completed roofs, roofing gallery',
    },
    schema: [
      localBusinessSchema(),
      S.breadcrumb([{ name: 'Home', url: '/' }, { name: 'Projects', url: '/projects' }], BASE_URL),
    ],
  });
});

// Blog index
app.get('/blog', (req, res) => {
  const q = (req.query.q || '').toString().toLowerCase().trim();
  const list = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : posts;

  res.render('blog', {
    list,
    query: q,
    meta: {
      title: `Roofing Blog & Expert Advice | ${site.name}`,
      description:
        'Practical roofing advice from the Roofex team — roof lifespan guides, repair and maintenance checklists, material comparisons, storm damage tips and cost breakdowns.',
      keywords: 'roofing blog, roof maintenance tips, roof repair advice, roofing costs',
    },
    schema: [
      localBusinessSchema(),
      S.breadcrumb([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }], BASE_URL),
      S.itemList(
        'Roofing Articles',
        posts.map((p) => ({ name: p.title, url: `${BASE_URL}/blog/${p.slug}` }))
      ),
    ],
  });
});

// Blog post
app.get('/blog/:slug', (req, res, next) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (!post) return next();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  res.render('post', {
    post,
    related,
    meta: {
      title: post.metaTitle,
      description: post.metaDescription,
      keywords: `${post.category}, roofing advice, ${site.name}`,
      type: 'article',
      image: post.image,
      preloadImage: post.image,
    },
    canonical: `${BASE_URL}/blog/${post.slug}`,
    schema: [
      localBusinessSchema(),
      S.breadcrumb(
        [
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ],
        BASE_URL
      ),
      S.articleSchema(post, site, BASE_URL),
    ],
  });
});

// FAQ
app.get('/faq', (req, res) => {
  const faqs = [
    { q: 'How much does a new roof cost?', a: 'A typical 2,000 sq ft home with architectural shingles ranges from roughly $9,400 to $18,000. Metal, tile and slate cost more. Every quote is fixed, itemised and free.' },
    { q: 'How long does a roof replacement take?', a: 'Most single-family homes are completed in one to two days. Larger homes, steep pitches and tile or slate roofs can take three to five days.' },
    { q: 'Do you offer free estimates and inspections?', a: 'Yes. Both are free and come with photo documentation and a written report. There is never any obligation to buy.' },
    { q: 'Are you licensed and insured?', a: `We hold ${site.license} and carry ${site.insurance}. Certificates are available on request.` },
    { q: 'Do you work with insurance claims?', a: 'Yes. We document storm damage in the format adjusters expect, meet your adjuster on site and handle the paperwork so your claim captures the full scope of work.' },
    { q: 'What warranty do you provide?', a: 'Every installation includes the manufacturer’s material warranty plus our own 10-year workmanship warranty. Repairs carry a written workmanship warranty as well.' },
    { q: 'Do you offer financing?', a: 'Yes, financing is available with approved credit, and we can help you understand monthly payment options before you commit.' },
    { q: 'How soon can you start?', a: 'Repairs are usually scheduled within the same week. Replacement projects typically begin within one to three weeks depending on materials and weather.' },
    { q: 'Do you clean up after the job?', a: 'Always. We protect landscaping, run a magnetic sweep for nails and leave the site cleaner than we found it.' },
    { q: 'Which areas do you serve?', a: `We serve ${site.serviceArea.slice(0, 6).join(', ')} and the wider Kansas City metro area.` },
  ];

  res.render('faq', {
    faqs,
    meta: {
      title: `Roofing FAQs | Common Questions Answered | ${site.name}`,
      description:
        'Answers to the most common roofing questions — costs, timelines, warranties, insurance claims, financing and how Roofex works. Still stuck? Call us any time.',
      keywords: 'roofing FAQ, roof cost questions, roofing warranty, roofing insurance claims',
    },
    schema: [
      localBusinessSchema(),
      S.breadcrumb([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }], BASE_URL),
      S.faqSchema(faqs),
    ],
  });
});

// Contact
app.get('/contact', (req, res) => {
  res.render('contact', {
    sent: false,
    error: null,
    form: {},
    meta: {
      title: `Contact ${site.name} | Free Roofing Estimate in ${site.address.city}`,
      description:
        `Get a free roofing estimate from Roofex. Call ${site.phone}, email ${site.email} or send us a message — we reply within one business day. 24/7 emergency roof response.`,
      keywords: 'contact roofer Kansas City, free roof estimate, roofing quote',
    },
    schema: [
      localBusinessSchema(),
      S.breadcrumb([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }], BASE_URL),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contact ${site.name}`,
        url: `${BASE_URL}/contact`,
      },
    ],
  });
});

app.post('/contact', (req, res) => {
  const { name = '', email = '', phone = '', service = '', message = '' } = req.body;
  const errors = [];
  if (!name.trim()) errors.push('Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push('Please enter a valid email address.');
  if (!message.trim() || message.trim().length < 10) errors.push('Please tell us a little about your project.');

  if (errors.length) {
    return res.status(422).render('contact', {
      sent: false,
      error: errors.join(' '),
      form: { name, email, phone, service, message },
      meta: {
        title: `Contact ${site.name} | Free Roofing Estimate`,
        description: 'Get in touch with the Roofex team for a free roofing estimate.',
      },
      schema: [localBusinessSchema()],
    });
  }

  // No database / admin panel — log the enquiry for the host's mail pipeline.
  console.log(`[contact] ${new Date().toISOString()} | ${name} | ${email} | ${phone} | ${service}`);
  console.log(`[contact] message: ${message}`);

  res.render('contact', {
    sent: true,
    error: null,
    form: {},
    meta: {
      title: `Thank You | ${site.name}`,
      description: 'Thank you for contacting Roofex. We will be in touch within one business day.',
    },
    schema: [localBusinessSchema()],
  });
});

// Legal
app.get('/privacy-policy', (req, res) => {
  res.render('privacy', {
    meta: {
      title: `Privacy Policy | ${site.name}`,
      description: `How ${site.legalName} collects, uses and protects your personal information.`,
    },
    schema: [localBusinessSchema()],
  });
});

app.get('/terms', (req, res) => {
  res.render('terms', {
    meta: {
      title: `Terms of Service | ${site.name}`,
      description: `The terms and conditions that govern the use of the ${site.name} website and services.`,
    },
    schema: [localBusinessSchema()],
  });
});

// Dynamic robots.txt (absolute sitemap URL)
app.get('/robots.txt', (req, res) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Marketing pages are fully public and indexable.',
    'Disallow: /contact?*',
    '',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  res.type('text/plain').send(body);
});

// Dynamic sitemap
app.get('/sitemap.xml', (req, res) => {  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/faq', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.9', changefreq: 'yearly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const urls = [
    ...staticPages.map((p) => ({ loc: p.url, priority: p.priority, changefreq: p.changefreq, lastmod: new Date().toISOString().split('T')[0] })),
    ...services.map((s) => ({ loc: `/services/${s.slug}`, priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] })),
    ...posts.map((p) => ({ loc: `/blog/${p.slug}`, priority: '0.6', changefreq: 'yearly', lastmod: p.date })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${BASE_URL}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`;

  res.type('application/xml').send(xml);
});

/* ------------------------------------------------------------------ *
 * 404
 * ------------------------------------------------------------------ */
app.use((req, res) => {
  res.status(404).render('404', {
    meta: {
      title: `Page Not Found | ${site.name}`,
      description: 'The page you are looking for could not be found.',
    },
    schema: [localBusinessSchema()],
  });
});

/* Error handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('404', {
    meta: { title: `Something went wrong | ${site.name}`, description: 'An unexpected error occurred.' },
    schema: [localBusinessSchema()],
  });
});

/**
 * Only bind a port when this file is run directly (`npm start`).
 * Serverless platforms (Netlify Functions, Vercel) import the app instead and
 * drive it through their own handler, so listening there would be wasteful.
 */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n  Roofex is running →  ${BASE_URL}  (port ${PORT})\n`);
  });
}

module.exports = app;
