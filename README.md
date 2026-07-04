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

- `src/content/blog/*.md` — blog posts. Add a new file here to add a new post (frontmatter:
-   `title`, `description`, `pubDate`, `tags`, optional `draft: true` to hide it).
-   - `src/pages/` — Home, About, Contact, Blog index + post template.
    - - `src/components/` — Header, Footer.
      - - `src/layouts/BaseLayout.astro` — shared shell, fonts, meta tags.
        - - `src/styles/global.css` — Tailwind + brand utility classes (`.btn`, `.tag`, `.prose-dumb`).
          - - `tailwind.config.mjs` — brand colors (`paper`, `ink`, `siren`, `frost`, `cerulean`, `slate`)
            -   and fonts (`font-display`, `font-body`).
            -   - `brand.md` — full brand guide: palette, type, voice, logo rationale.
                - - `public/logo.svg`, `public/logo-stamp.svg` — wordmark and stamp/favicon mark.
                 
                  - ## Publishing a new post
                 
                  - Add a markdown file to `src/content/blog/`, e.g. `src/content/blog/my-new-post.md`:
                 
                  - ```md
                    ---
                    title: "Post title"
                    description: "One-sentence hook for cards/SEO."
                    pubDate: 2026-07-10
                    tags: ["tag-one", "tag-two"]
                    ---

                    Body in markdown.
                    ```

                    Push to the connected branch and Cloudflare rebuilds and redeploys automatically (once
                    Workers Builds is connected — see below).

                    ## Pushing to GitHub

                    This project is already pushed here. If you ever need to push from a fresh local clone,
                    standard git commands apply (`git remote add origin ...`, `git push -u origin main`).

                    ## Deploying on Cloudflare (Workers, not Pages — Cloudflare's current recommendation)

                    Cloudflare has moved static-site hosting from "Pages" to "Workers with static assets" +
                    "Workers Builds" for git integration (Pages still works but isn't the path Cloudflare is
                    investing in for new projects, and it's what the connected Cloudflare account tooling
                    expects). Functionally it's the same idea: connect a repo, auto-build on push, free static
                    hosting.

                    1. In the Cloudflare dashboard: **Workers & Pages → Create → Import a Git repository**,
                    2.    authorize GitHub if prompted, and select the `dumbgtm/primary` repo.
                    3.2. Cloudflare should auto-detect Astro. Confirm:
                         - Build command: `npm run build`
                         - Deploy/output directory: `dist`
                      3. Deploy. You'll get a live `*.workers.dev` URL immediately.
                      4. 4. **Custom domain:** in the Worker's **Settings → Domains & Routes → Add**, enter
                         5.    `dumbgtm.com` (and `www.dumbgtm.com`). Since the domain's already in the same Cloudflare
                         6.   account, this is a few clicks with no manual DNS editing.
                         7.   5. Every push to `main` rebuilds and redeploys automatically from then on.
                           
                              6. ## Before real launch — still open
                           
                              7. - **Contact form**: currently points at a placeholder Formspree endpoint in `src/pages/contact.astro`
                                 -   (`action="https://formspree.io/f/YOUR_FORM_ID"`). Create a free form at formspree.io and swap in
                                 -     the real endpoint, or replace with a Cloudflare Pages Function if you'd rather keep it in-house.
                                 - - **hello@dumbgtm.com**: referenced on the Contact page. Set up email routing for the domain in
                                   -   Cloudflare (Email → Email Routing) to forward it to your real inbox.
                                   -   - **Operator sign-up + booking**: out of scope for this pass. When ready, this will likely need:
                                       -   a database (Cloudflare D1 works well with Astro on Workers), auth for operators, and a booking/
                                       -     payment flow (e.g. Stripe Checkout + Calendly-style scheduling, or a custom booking table).
                                       - - **Analytics**: none wired up yet. Cloudflare Web Analytics is free and privacy-friendly if you
                                         -   want basic traffic numbers without a cookie banner.
                                         -   - **OG image**: pages currently only set text OG tags. Consider a simple branded 1200x630 image
                                             -   for link previews before sharing posts on social.
                                             -   
