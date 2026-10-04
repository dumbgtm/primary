# dumbGTM

Contrarian GTM blog + (future) operator booking marketplace. Built with Astro + Tailwind,
static output, deployed on Cloudflare (Workers with static assets).

## Local dev

```
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Project structure

- `src/content/blog/*.md` — long-form posts. Add a new file here to add a new post
  (frontmatter: `title`, `description`, `pubDate`, `tags`, optional `draft: true` to hide it).
- `src/pages/` — Home, About, Contact, Blog index + post template.
- `src/components/` — Header, Footer, MemoHeader, MemoList, SignatureBlock, StageBadge, SocialButton, Icon,
  Stamp, PaperclipCard, HolePunch, Fig1 (the dumb idea loop). Icons live in `src/lib/icons.ts`.
- `src/layouts/BaseLayout.astro` — shared shell, fonts, meta tags, OG/Twitter card tags,
  analytics.
- `src/styles/global.css` — Tailwind + brand tokens and utility classes (`.btn-primary`, `.tag`, `.prose-memo`, ...).
- `tailwind.config.mjs` — brand colors (`memo`, `carbon`, `ink`, `ink2`, `muted`, `staple`, `rule`, `blue`,
  `highlighter`), fonts (`font-serif` Libre Caslon Text, `font-mono` Space Mono), square corners.
- `brand.md` — full brand guide: palette, type, voice, logo rationale.
- `public/brand/` — official logo files (wordmark variants, mark, PNG sizes, avatar) from the logo handoff.
  Copy as-is; never retype the logo. `public/favicon.svg` + `public/site.webmanifest` — favicon and app icons.
- `public/og/` — branded 1200x630 social share images (see "Generating OG share images" below).
- `scripts/og-template.html` — reusable template used to generate those images.

## Publishing a new post

Add a markdown file to `src/content/blog/`, e.g. `src/content/blog/my-new-post.md`:

```md
---
title: "Post title"
description: "One-sentence hook for cards/SEO."
pubDate: 2026-07-10
tags: ["tag-one", "tag-two"]
---

Body in markdown.
```

Then generate an OG image for it (see below) at `public/og/blog/my-new-post.png`.

Push to the connected branch and Cloudflare rebuilds and redeploys automatically (once
Workers Builds is connected — see below).

## Generating OG share images

Every page has a branded 1200x630 image for link previews (`og:image`/`twitter:image`),
sourced from `scripts/og-template.html` (Graphics Kit §06). It's a static HTML template driven by
URL query params: `mode` (`default` or `memo`), `memo` (number), `stage` (1-4), `title`, `italic`
(the punchline part of the title) and `date`. To generate a new one:

1. Serve the `website/` folder locally (e.g. `python3 -m http.server 8935` from that
   directory) so the template can load its Google Font.
2. Open `http://localhost:8935/scripts/og-template.html?mode=memo&memo=004&stage=1&date=Oct+4,+2026&title=Your+title&italic=title`
   in a browser sized to exactly 1200x630, or screenshot it with headless Chrome:
   ```
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --headless --disable-gpu --hide-scrollbars --window-size=1200,630 \
     --screenshot=public/og/blog/my-new-post.png \
     "http://localhost:8935/scripts/og-template.html?mode=memo&memo=004&stage=1&date=Oct+4,+2026&title=Your+title&italic=title"
   ```
3. Reference it via the page's `ogImage` prop on `<BaseLayout>` (blog posts do
   this automatically from the slug; other pages set it explicitly).

This is a manual step for now rather than a build-time step, since it avoids adding an
image-rendering dependency (satori/resvg, etc.) to the build — worth automating later if
publishing volume goes up.

## Pushing to GitHub

A git repo has already been initialized here with one commit. To get it onto GitHub:

1. Create a new **empty** repo at [github.com/new](https://github.com/new) (don't add a
   README/.gitignore/license — this project already has them). Name suggestion: `dumbgtm`.
2. In a terminal, `cd` into this folder and run:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/dumbgtm.git
   git push -u origin main
   ```
   (GitHub will prompt you to sign in the first time — that happens in your own browser/
   credential manager, nothing to configure here.)

## Deploying on Cloudflare (Workers, not Pages — Cloudflare's current recommendation)

Cloudflare has moved static-site hosting from "Pages" to "Workers with static assets" +
"Workers Builds" for git integration (Pages still works but isn't the path Cloudflare is
investing in for new projects, and it's what the connected Cloudflare account tooling
expects). Functionally it's the same idea: connect a repo, auto-build on push, free static
hosting.

1. Push the repo to GitHub (above) first.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Import a Git repository**,
   authorize GitHub if prompted, and select the `dumbgtm` repo.
3. Cloudflare should auto-detect Astro. Confirm:
   - Build command: `npm run build`
   - Deploy/output directory: `dist`
4. Deploy. You'll get a live `*.workers.dev` URL immediately.
5. **Custom domain:** in the Worker's **Settings → Domains & Routes → Add**, enter
   `dumbgtm.com` (and `www.dumbgtm.com`). Since the domain's already in the same Cloudflare
   account, this is a few clicks with no manual DNS editing.
6. Every push to `main` rebuilds and redeploys automatically from then on.

## Before real launch — still open

- **Contact form**: currently points at a placeholder Formspree endpoint in `src/pages/contact.astro`
  (`action="https://formspree.io/f/YOUR_FORM_ID"`). Create a free form at formspree.io and swap in
  the real endpoint, or replace with a Cloudflare Pages Function if you'd rather keep it in-house.
- **hello@dumbgtm.com / contact@dumbgtm.com**: Cloudflare Email Routing is live, forwarding
  both to the account owner's inbox.
- **Operator sign-up + booking**: out of scope for this pass. When ready, this will likely need:
  a database (Cloudflare D1 works well with Astro on Workers), auth for operators, and a booking/
  payment flow (e.g. Stripe Checkout + Calendly-style scheduling, or a custom booking table).
- **Analytics**: GA4 is live in `src/layouts/BaseLayout.astro`. Cloudflare Web Analytics is wired
  but still disabled — swap in a real `CF_ANALYTICS_TOKEN` (from Cloudflare Analytics & Logs →
  Web Analytics → Manage site) near the top of that file when ready.
