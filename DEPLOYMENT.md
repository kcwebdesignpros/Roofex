# Roofex — Deployment Guide

How to take this Node.js site live on **Vercel** and on **Hostinger**.

The project is a standard Express + EJS app. There is no database and no admin panel — all content lives in `/data`, so deployment is simply *upload the code, install dependencies, set two environment variables, start the process*.

---

## 0. Before you deploy — 5-minute checklist

| # | Task | Where |
|---|------|-------|
| 1 | Replace the placeholder business details (phone, email, address, licence, social links) | `data/site.js` |
| 2 | Set `SITE_URL` to your real domain | Environment variables (any platform) |
| 3 | Point the contact form at a real mailbox (see §6) | `server.js` → `POST /contact` |
| 4 | Replace placeholder team names/photos if needed | `data/team.js` + `img/team-*.webp` |
| 5 | After going live, submit `/sitemap.xml` to Google Search Console | Search Console |

> **Important:** `SITE_URL` must be your final domain (e.g. `https://www.roofex.com`) — it is baked into every canonical tag, Open Graph URL and the sitemap. Get it right before launch.

---

## 1. Run it locally (already done, for reference)

```bash
npm install
npm start            # http://localhost:3000
# or, for auto-restart on file changes:
npm run dev
```

Environment variables locally live in a `.env` file — copy `.env.example` and edit it. (The server reads `process.env.PORT` and `process.env.SITE_URL`; if you don't use a dotenv loader, just export them in your shell.)

---

## 2. Deploy to Vercel

Vercel is the fastest path. It gives you HTTPS, a global CDN and automatic deploys from Git — all on the free Hobby plan for a site like this.

### 2a. Push the project to GitHub

```bash
cd "Roofing Website"
git init
git add .
git commit -m "Roofex roofing website"
git branch -M main
git remote add origin https://github.com/<your-user>/roofex.git
git push -u origin main
```

A `vercel.json` is already included. It tells Vercel to run `server.js` with the `@vercel/node` runtime and to bundle the `views`, `data`, `lib`, `public` and `img` folders — this is the part that most Express-on-Vercel failures get wrong, so leave it in place.

### 2b. Import into Vercel

1. Go to <https://vercel.com/new> and sign in (GitHub login is easiest).
2. Click **Add New → Project**, then **Import** the `roofex` repository.
3. On the configure screen set:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (leave default)
   - **Build Command:** leave **empty**
   - **Output Directory:** leave **empty**
   - **Install Command:** `npm install`
4. Expand **Environment Variables** and add:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `SITE_URL` | `https://your-domain.com` | Production, Preview, Development |

   Do **not** set `PORT` on Vercel — the platform injects it.
5. Click **Deploy**. First build takes ~1 minute. You will get a URL like `roofex.vercel.app`.

### 2c. Add your custom domain

1. Project → **Settings → Domains → Add**.
2. Enter `roofex.com` and `www.roofex.com`.
3. Vercel shows the DNS records to create at your registrar:
   - Apex domain → **A record** → `76.76.21.21`
   - `www` → **CNAME** → `cname.vercel-dns.com`
4. Wait for DNS to propagate (usually minutes). Vercel issues a free SSL certificate automatically.
5. Choose your preferred redirect (e.g. `roofex.com` → `www.roofex.com`) and update `SITE_URL` to match exactly.
6. **Redeploy** after changing `SITE_URL` so the canonical tags and sitemap update.

### 2d. Deploying from the CLI instead of Git (optional)

```bash
npm i -g vercel
cd "Roofing Website"
vercel              # preview deployment — answer the prompts, framework = Other
vercel --prod       # production deployment
```

Set the env var once:

```bash
vercel env add SITE_URL production
```

### 2e. Vercel troubleshooting

| Symptom | Fix |
|---------|-----|
| `500` with "Failed to lookup view" | `vercel.json` is missing or `views/**` is not in `includeFiles`. Restore the file. |
| Images 404 but pages load | Confirm the `img/` folder is committed to Git (check `.gitignore`). |
| Canonical tags show `localhost` | `SITE_URL` is not set — add it and redeploy. |
| Contact form works but you get no email | Expected — see §6. |

---

## 3. Deploy to Netlify

**Read this first:** Netlify is a static host with serverless functions — unlike Vercel and Hostinger it does **not** run a long-lived Node process. Express therefore runs inside a single catch-all function using `serverless-http`. That wiring is already committed, so you only need to connect the repo.

### 3a. What is already configured

| File | Purpose |
|------|---------|
| `netlify.toml` | Build command, publish directory, function directory, catch-all rewrite, cache + security headers |
| `netlify/functions/server.js` | Wraps the Express app with `serverless-http` |
| `scripts/prepare-netlify.js` | Copies `img/` → `public/img/` so images are served from the CDN instead of the function |
| `serverless-http` | Added to `dependencies` |

Two details in `netlify.toml` are load-bearing and worth understanding:

```toml
[functions]
  node_bundler = "esbuild"
  included_files = ["views/**", "data/**", "lib/**", "img/**"]
```

EJS templates are read from **disk at runtime**, not `require`d — so the bundler cannot discover them by itself. Without `included_files` every page fails with `Failed to lookup view "index"`.

There is a second, subtler bundling trap that `server.js` already works around. Express does not `require('ejs')` directly — it resolves the engine lazily with a **dynamic** call:

```js
// express/lib/view.js, line ~81
var fn = require(mod).__express;   // `mod` is a variable — invisible to bundlers
```

Because the argument is a variable, esbuild cannot statically detect it and leaves it as a runtime `require('ejs')`. Inside the bundled function there is no `node_modules`, so it throws `Cannot find module 'ejs'`. The fix is to register the engine up front, which makes Express skip that lookup entirely (`if (!opts.engines[this.ext])`):

```js
const ejs = require('ejs');            // static require → esbuild inlines it
app.engine('ejs', ejs.__express);      // engine pre-registered → no dynamic require
app.set('view engine', 'ejs');
```

This is also why `ejs` must stay in `dependencies` and the top-level `require('ejs')` must not be removed.

```toml
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200
```

There is deliberately **no `force = true`**. Netlify serves a matching file from the publish directory before applying the rewrite, so `/css/*`, `/js/*` and `/img/*` never reach the function — only real page routes do.

### 3b. Deploy from the Netlify UI (recommended)

1. Make sure the repo is on GitHub (see §2a).
2. Go to <https://app.netlify.com/start> and sign in with GitHub.
3. **Add new site → Import an existing project → GitHub →** pick `kcwebdesignpros/Roofex`.
4. Netlify reads `netlify.toml`, so the build settings fill in automatically. Confirm they read:

   | Setting | Value |
   |---------|-------|
   | Build command | `npm run prepare:netlify` |
   | Publish directory | `public` |
   | Functions directory | `netlify/functions` |

5. Expand **Environment variables** and add:

   | Key | Value |
   |-----|-------|
   | `SITE_URL` | `https://your-domain.com` (no trailing slash) |

   Do **not** set `PORT` — there is no port to bind.
6. Click **Deploy site**. The first build takes about a minute.

### 3c. Deploy from the CLI

```bash
npm install -g netlify-cli
netlify login

cd "Roofing Website"
netlify init                       # create + link a new site (or: netlify link)

netlify env:set SITE_URL https://www.roofex.com

netlify deploy --build             # draft URL for testing
netlify deploy --build --prod      # production
```

`--build` matters: it runs the build command locally first, so you catch a broken build before it reaches Netlify.

### 3d. Add your custom domain

1. Site → **Domain management → Add a domain**.
2. Either delegate DNS to Netlify (change your nameservers) or keep your registrar and add:

   | Type | Name | Value |
   |------|------|-------|
   | `CNAME` | `www` | `your-site-name.netlify.app` |
   | `A` | `@` | `75.2.60.5` |

3. Netlify provisions a free Let's Encrypt certificate automatically and renews it.
4. Set your primary domain and enable the redirect to it, then update `SITE_URL` to match **exactly** and trigger a redeploy so canonical tags and the sitemap pick it up.

### 3e. Redeploying

Any push to `main` triggers an automatic build. Every pull request gets its own Deploy Preview URL, which is handy for reviewing content changes before they go live.

### 3f. Netlify troubleshooting

| Symptom | Cause / fix |
|---------|-------------|
| `Failed to lookup view "index"` | `included_files` is missing or wrong in the `[functions]` block of `netlify.toml`. |
| `Cannot find module 'ejs'` (or any view engine) | Express loads engines with a **dynamic** `require(mod).__express` that bundlers cannot detect, so the module is never inlined. Already fixed in `server.js` via `app.engine('ejs', ejs.__express)` — **do not remove that line**, and keep the top-level `require('ejs')` so the dependency stays statically analysable. |
| Images return 404 | The build step didn't run. Check the build log for `✓ Copied N images to public/img`. |
| Every page returns 502 | The function crashed. Netlify → **Functions → server → Logs** shows the stack trace. |
| Only the homepage works | The `/*` redirect is missing, or `force = true` was added (which would also swallow `/css`, `/js` and `/img`). |
| Canonical tags say `localhost` | `SITE_URL` isn't set — add it and redeploy. |
| First request of the day is slow | Serverless cold start (~300–600 ms). Subsequent requests are served from Netlify's CDN edge because the app returns `s-maxage=3600`. |

### 3g. Netlify vs Vercel for this project

Both work, and the repo supports each without changes.

- **Vercel** runs the Express app natively (`vercel.json` → `@vercel/node`). Fewer moving parts, no wrapper, no build step.
- **Netlify** needs the function wrapper and the image-copy build step, but the free tier is generous and Deploy Previews are excellent for client review.

If you have no strong preference, Vercel is the marginally simpler host for this stack. Netlify is a perfectly good choice if you already use it elsewhere.

---

## 4. Deploy to Hostinger

Hostinger offers two routes. Pick based on your plan.

### Option A — Hostinger VPS / Cloud with Node.js (recommended, full control)

**A1. Create the server and connect**

1. In hPanel, order a **VPS** (KVM 2 or higher is plenty) with an **Ubuntu 22.04 / 24.04** template.
2. Note the server IP and root password from the email Hostinger sends.
3. Connect:

   ```bash
   ssh root@YOUR_SERVER_IP
   ```

**A2. Install Node.js, Git and PM2**

```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx
npm install -g pm2
node -v && npm -v
```

**A3. Put the code on the server**

Either clone from Git:

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/<your-user>/roofex.git roofex
cd roofex
```

…or upload the folder with the hPanel **File Manager** / `scp` / SFTP into `/var/www/roofex`.

**A4. Install dependencies and configure**

```bash
cd /var/www/roofex
npm install --omit=dev
```

Create the environment file:

```bash
cat > /var/www/roofex/.env <<'EOF'
PORT=3000
SITE_URL=https://www.roofex.com
EOF
```

The server reads these from the process environment, so export them (or use PM2's `--env`, shown next).

**A5. Start the app with PM2 (keeps it running forever)**

```bash
cd /var/www/roofex
PORT=3000 SITE_URL=https://www.roofex.com pm2 start server.js --name roofex
pm2 save
pm2 startup        # run the command it prints, so PM2 restarts after a reboot
pm2 status
```

Useful PM2 commands:

```bash
pm2 logs roofex        # live logs
pm2 restart roofex     # after deploying new code
pm2 stop roofex
```

**A6. Put Nginx in front (port 80/443 → 3000)**

```bash
cat > /etc/nginx/sites-available/roofex <<'EOF'
server {
    listen 80;
    server_name roofex.com www.roofex.com;

    # Security headers are also set by the app; these are a belt-and-braces layer.
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Let Nginx serve the static assets directly — faster than the Node process.
    location /img/  { alias /var/www/roofex/img/;  expires 30d; access_log off; }
    location /css/  { alias /var/www/roofex/public/css/; expires 7d; access_log off; }
    location /js/   { alias /var/www/roofex/public/js/;  expires 7d; access_log off; }
}
EOF

ln -sf /etc/nginx/sites-available/roofex /etc/nginx/sites-enabled/roofex
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

**A7. Free SSL with Let's Encrypt**

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d roofex.com -d www.roofex.com
```

Certbot rewrites the Nginx config to serve HTTPS and sets up auto-renewal.

**A8. Point your domain at the VPS**

In Hostinger → **Domains → DNS / Nameservers**, set:

- `A` record `@` → your VPS IP
- `A` record `www` → your VPS IP

**A9. Redeploying later**

```bash
cd /var/www/roofex
git pull
npm install --omit=dev
pm2 restart roofex
```

**A10. Firewall**

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

---

### Option B — Hostinger hPanel Node.js app (shared / cloud hosting)

Available on plans that include **Node.js** support. If your plan does not show a Node.js section in hPanel, use Option A.

1. **Upload the project.** hPanel → **Files → File Manager**, create a folder such as `roofex` inside your hosting space, and upload the project (zip and extract is easiest). Exclude `node_modules`.
2. **Create the application.** hPanel → **Advanced → Node.js** → **Create Application**:
   - **Node.js version:** 18 or 20
   - **Application root:** `roofex` (the folder you created)
   - **Application URL:** your domain
   - **Application startup file:** `server.js`
3. **Environment variables.** In the same screen add:
   - `SITE_URL` = `https://your-domain.com`
   - `PORT` — usually provided automatically; if asked, use the port hPanel shows.
4. **Install dependencies.** Click **Run NPM Install** (or open the terminal and run `npm install --omit=dev`).
5. **Start / Restart** the application. Open your domain — the site should load.
6. **SSL.** hPanel → **Security → SSL** → install the free Let's Encrypt certificate and enable **Force HTTPS**.
7. **Updating.** Re-upload changed files (or use hPanel → **Advanced → GIT** to deploy from a repository), then click **Restart** in the Node.js panel.

---

## 5. Environment variables summary

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `SITE_URL` | **Yes** | `https://www.roofex.com` | Canonical URLs, Open Graph, JSON-LD `@id`, absolute sitemap URL. No trailing slash. |
| `PORT` | VPS/Hostinger only | `3000` | Port the Node process binds to. Vercel injects its own. |

---

## 6. Wiring the contact form to a real inbox

Out of the box, `POST /contact` validates the submission, logs it to the server console and renders a success page — deliberately, so the site works with **no database and no admin panel**.

To actually receive emails, pick one of these:

**Option 1 — SMTP (Nodemailer).** Best on a VPS.

```bash
npm install nodemailer
```

Then in `server.js`, inside the `POST /contact` handler where the submission is logged, send the enquiry to your inbox:

```js
const nodemailer = require('nodemailer');
const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

await mailer.sendMail({
  from: `"Roofex Website" <${process.env.SMTP_USER}>`,
  to: 'hello@roofex.com',
  replyTo: email,
  subject: `New roofing enquiry — ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\n${message}`,
});
```

Add `SMTP_HOST`, `SMTP_USER` and `SMTP_PASS` to your environment variables.

**Option 2 — Form endpoint.** Create a form on Formspree / Web3Forms / Getform and change the `<form action="…">` attributes in `views/index.ejs` and `views/contact.ejs` to post directly to that endpoint. No server code changes needed.

**Option 3 — Serverless email API.** On Vercel, call Resend, Postmark or SendGrid's HTTP API from the handler (no SMTP ports to worry about).

---

## 7. Post-launch SEO checklist

1. Submit `https://your-domain.com/sitemap.xml` in **Google Search Console**.
2. Verify `https://your-domain.com/robots.txt` returns the correct absolute sitemap URL.
3. Run the homepage and one service page through the **Rich Results Test** (<https://search.google.com/test/rich-results>) — you should see `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList` and `BlogPosting` detected.
4. Validate social previews with the **Facebook Sharing Debugger** and **X Card Validator**.
5. Claim/complete your **Google Business Profile** and make sure the name, address and phone match `data/site.js` exactly (NAP consistency).
6. Run **PageSpeed Insights** on the homepage — the site ships compressed HTML, lazy-loaded WebP images, a single CSS file and one small deferred JS file.

---

## 8. Quick reference — project structure

```
Roofing Website/
├── server.js              # Express app, routes, sitemap, robots, security headers
│                          # (exports the app; only binds a port when run directly)
├── vercel.json            # Vercel build + routing + cache headers
├── netlify.toml           # Netlify build, functions, rewrite + cache headers
├── netlify/functions/
│   └── server.js          # Netlify entry — wraps the app with serverless-http
├── scripts/
│   ├── prepare-netlify.js # Copies /img → /public/img for Netlify's CDN
│   └── generate-image-variants.js  # Rebuilds responsive WebP variants + img/manifest.json
├── .env.example           # Environment variable template
├── .gitattributes         # LF normalisation + binary markers
├── package.json
├── data/                  # ← ALL CONTENT LIVES HERE (no database needed)
│   ├── site.js            # Business details, nav, stats, social links
│   ├── services.js        # 8 services → 8 detail pages
│   ├── posts.js           # 6 blog articles
│   ├── projects.js        # Portfolio entries
│   └── team.js            # Team members
├── lib/
│   ├── schema.js          # JSON-LD structured data builders
│   └── icons.js           # Inline SVG icon set
├── views/                 # EJS templates
│   ├── partials/          # head, header, footer, page-hero, cta
│   └── *.ejs              # One file per page type
├── public/                # css/style.css · js/main.js · site.webmanifest
│                          # (public/img/ is a Netlify build artefact — git-ignored)
└── img/                   # All images (WebP) + favicons — source of truth
```
