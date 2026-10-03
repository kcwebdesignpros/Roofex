# Roofex — Roofing Company Website

A fast, SEO-optimised marketing website for a roofing business, built with **Node.js + Express + EJS**.
No database, no admin panel — all content lives in plain JavaScript data files, so it deploys anywhere and runs for free.

**Brand palette**

| Colour | Hex | Use |
|--------|-----|-----|
| Deep Navy (Primary) | `#073B82` | Logo, headings, navigation, buttons, footer |
| Roof Orange (Secondary) | `#FF6B00` | Icons, highlights, CTA buttons, roof graphic |
| White (Accent) | `#FFFFFF` | Text on dark backgrounds, clean sections |
| Sky Blue (Light Accent) | `#EAF4FF` | Section backgrounds, cards, subtle highlights |

---

## Quick start

```bash
npm install
npm start          # → http://localhost:3000
```

For development with auto-restart:

```bash
npm run dev
```

Copy `.env.example` to `.env` (or export the variables in your shell) to set `PORT` and `SITE_URL`.

---

## Pages included

| Route | Description |
|-------|-------------|
| `/` | Home — hero, about, 8 services, process, why-us, team, testimonials, contact form, blog, service area |
| `/about` | Company story, values, team, credentials |
| `/services` | All services overview |
| `/services/:slug` | **8 service detail pages** — overview, features, benefits, process, FAQ |
| `/projects` | Portfolio with project facts |
| `/blog` | Article index with search |
| `/blog/:slug` | **6 long-form articles** |
| `/faq` | 10 FAQs with accordion |
| `/contact` | Contact details, hours, validated enquiry form |
| `/privacy-policy`, `/terms` | Legal pages |
| `/sitemap.xml`, `/robots.txt` | Generated dynamically from your content |
| `404` | Friendly not-found page with popular links |

**Services:** Residential Roofing · Commercial Roofing · Roof Repair & Maintenance · Roof Installation & Replacement · Roof Inspection & Leak Detection · Gutter Installation & Cleaning · Storm Damage Restoration · Emergency Roofing

---

## SEO features

- **Unique title + meta description + keywords** on every page
- **Canonical URLs** on every page
- **Open Graph + Twitter Card** tags with a generated 1200×630 share image
- **JSON-LD structured data:**
  - `RoofingContractor` / `LocalBusiness` (address, geo, opening hours, area served, aggregate rating, social profiles)
  - `WebSite` with `SearchAction`
  - `Service` on every service page (with `Offer` pricing)
  - `FAQPage` on the home, FAQ and every service page
  - `BreadcrumbList` on every inner page
  - `BlogPosting` on every article
  - `ItemList` on the services and blog indexes
- **Dynamic `sitemap.xml`** (23 URLs) with `lastmod`, `changefreq` and `priority`
- **`robots.txt`** with an absolute sitemap reference
- Semantic HTML, single `h1` per page, logical heading hierarchy, descriptive `alt` text
- Internal linking between services, articles and related content

## Performance features

- Server-rendered HTML — content is in the first byte, no client-side hydration
- **gzip/Brotli compression** on all responses
- **Long-lived cache headers** for `/img`, `/css`, `/js`; short revalidating cache for HTML
- All images are **WebP**, lazy-loaded (`loading="lazy"` + `decoding="async"`) with explicit `width`/`height` to prevent layout shift
- Hero image loaded eagerly with `fetchpriority="high"`
- **One CSS file, one small deferred JS file** — no frameworks, no jQuery
- Fonts loaded with `preconnect` + `display=swap` and a non-blocking load pattern
- Inline SVG icons — zero icon-font or extra image requests
- Security headers (nosniff, frame options, referrer policy, permissions policy, HSTS)

---

## Project structure

```
Roofing Website/
├── server.js              # Express app: routes, sitemap, robots, headers
├── vercel.json            # Vercel build, routing and cache config
├── netlify.toml           # Netlify build, functions, rewrite and cache config
├── netlify/functions/
│   └── server.js          # Netlify entry point (wraps the app with serverless-http)
├── scripts/
│   └── prepare-netlify.js # Copies /img → /public/img for Netlify's CDN
├── .env.example
├── .gitattributes         # LF normalisation + binary markers
├── data/                  # ← EDIT CONTENT HERE
│   ├── site.js            # Business name, phone, email, address, nav, stats, socials
│   ├── services.js        # 8 services (each generates a detail page)
│   ├── posts.js           # 6 blog articles
│   ├── projects.js        # Portfolio entries
│   └── team.js            # Team members
├── lib/
│   ├── schema.js          # JSON-LD builders
│   └── icons.js           # Inline SVG icon set
├── views/
│   ├── partials/          # head · header · footer · page-hero · cta
│   └── *.ejs              # index, about, services, service, projects, blog, post, faq, contact, privacy, terms, 404
├── public/
│   ├── css/style.css
│   ├── js/main.js
│   └── site.webmanifest
└── img/                   # WebP images, favicons, OG image
```

---

## Editing content

Everything is data-driven — you never need to touch the templates to update content.

- **Business details** (phone, email, address, hours, licence, socials, service area, stats) → `data/site.js`
- **Add a service** → add an object to the array in `data/services.js`. It automatically gets a detail page, a sitemap entry, a `Service` schema block and cards on the home + services pages.
- **Add a blog post** → add an object to `data/posts.js` (`body` accepts HTML).
- **Add a project / team member** → `data/projects.js` / `data/team.js`.

> Always update `SITE_URL` to your live domain before launch — it drives canonical tags, Open Graph URLs, JSON-LD `@id` values and the sitemap.

---

## Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for complete, step-by-step guides:

- **Vercel** — Git import, environment variables, custom domain, CLI deploys, troubleshooting
- **Netlify** — serverless-function setup (`netlify.toml`, `serverless-http`, the image-copy build step), CLI deploys, domain, troubleshooting
- **Hostinger** — both the VPS route (Node + PM2 + Nginx + Let's Encrypt) and the hPanel Node.js app route
- Wiring the contact form to a real inbox (SMTP, form endpoint, or serverless email API)
- Post-launch SEO checklist

All three hosts work from the same repo with no code changes — the platform-specific wiring is already committed.

---

## Notes

- The contact form has **no database**. It validates the submission, logs it to the server console and shows a success page. See DEPLOYMENT.md §6 to connect it to email.
- Contact details, licence numbers, team names and reviews are **placeholders** — replace them with real business information before going live.
