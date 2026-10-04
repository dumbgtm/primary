# dumbGTM Brand Guide: "HR Memo"

_Source: Claude Design handoff "DumbGTM Style Guide" (design_handoff_dumbgtm_hr_memo). High fidelity: match these exactly._

## Idea
A modern, deadpan take on office bureaucracy: paper-white pages, black ink, one blue for actions,
highlighter yellow for emphasis, and memo headers (TO / FROM / RE) as the signature pattern.
The joke lives in the copy. The layout stays straight-faced.

## Color (CSS variables in `src/styles/global.css`, Tailwind names in brackets)
| Token | Hex | Use |
|---|---|---|
| `--memo` (memo) | #FBFAF6 | page background, default surface |
| `--carbon` (carbon) | #F3F1EA | alt surface: inputs, row hover, footer |
| `--ink` (ink) | #141414 | text, 1px rules, borders, inverse background |
| `--ink-2` (ink2) | #3D3D39 | body copy |
| `--muted` (muted) | #5C5C56 | meta, labels, captions (lowest text color) |
| `--staple` (staple) | #9A9A96 | decorative only, never text on memo |
| `--rule` (rule) | #DAD8D0 | hairlines inside lists |
| `--blue` (blue) | #1F4FB8 | primary actions and links ONLY |
| `--blue-hover` | #173D8F | primary button hover |
| `--highlighter` | #F5EE6A | emphasis behind ink text, max 1 per view |

Rough coverage: 85% memo, 12% ink, 3% blue + highlighter. Never put blue next to highlighter.
`::selection` uses highlighter. No red anywhere.

## Type
- **Libre Caslon Text** (400, 400 italic, 700): headlines, logo, pull quotes, long-form article body. Italic for a headline's punchline.
- **Space Mono** (400, 700): all UI, including nav, buttons, labels, forms, memo headers, short copy and metadata.

| Token | Font | Size / line-height | Class |
|---|---|---|---|
| display | Caslon 400 | clamp(40px, 6vw, 72px) / 1.04, -0.01em | `.t-display` |
| h1 | Caslon 400 | 48/1.08 (34 mobile) | `.t-h1` |
| h2 | Caslon 400 | 32/1.15 (26 mobile) | `.t-h2` |
| h3 | Caslon 700 | 22/1.25 | `.t-h3` |
| body-serif | Caslon 400 | 19/1.65, max 68ch, ink-2 | `.prose-memo` |
| body-mono | Space Mono 400 | 14/1.6, ink-2 | `.t-body-mono` |
| small | Space Mono 400 | 12/1.6, muted | `.t-small` |
| label | Space Mono 400 | 11/1.4, uppercase, 0.06em | `.t-label` |
| tag | Space Mono 400 | 10, uppercase, 0.06em | `.tag` |

Logo: see **Logo** at the end of this file. Always use the files in `public/brand/`; never retype it.

## Shape and layout
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- **Border radius 0 everywhere. No shadows. No gradients.** (Enforced in `tailwind.config.mjs`.)
- Rule: 1px solid ink. Hairline: 1px solid rule, between list rows.
- Double rule (two 1px ink lines 2px apart): only at the top of the footer and the end of an article (`.double-rule`).
- Container 1120px, side padding 32px (20px under 640px) (`.container-memo`). Sections 96px desktop, 64px mobile.
- Breakpoint 640px: multi-column grids collapse to one column.

## Components (see `src/components/`)
- **Nav** (`Header.astro`): logo left, `label` links right with 24px gaps, 1px ink underline, highlighter on hover.
- **Memo header** (`MemoHeader.astro`): 70px label column + 1fr, 4px row gap, mono 12px muted; the RE value is ink. Goes above every hero and article title. `bordered` adds a 1px ink border and 16px padding.
- **Buttons**: `.btn-primary` (blue, memo text, mono 700 12px, 12x16, hover blue-hover); `.btn-secondary` (1px ink border, inverts on hover). 44px min height on mobile. Focus: 2px ink outline, 2px offset.
- **Text link** (`.link`): blue, underlined, 3px offset; hover is ink on highlighter.
- **Highlight**: `<mark>`, one per view at most.
- **Tags**: `.tag` (outline), `.tag-inverse` (e.g. "Confidential"), `.tag-highlighter` (for "New").
- **Signature block** (`SignatureBlock.astro`): 1px ink border, name in Caslon 700 15px, deadpan subtitle in mono 10px muted.
- **Form fields** (`.field`): carbon background, 1px ink border, mono 14px; focus is memo background plus a 1px blue inset ring. Errors use ink and a "⚠ Incomplete form." prefix, never red.
- **Memo list** (`MemoList.astro`): `120px 1fr auto` grid of memo number, title with RE line, date. Hairline rows, carbon on hover, stacks under 640px.
- **Footer**: double rule, 11px muted mono, deadpan sign-off.

## Motion
Transitions are 120ms ease-out on color and background only. No scroll or entrance animations.
The one exception is Fig. 1 on the homepage, where the highlighter steps §1→§4 every 2.4s and
holds on §1 for an extra second. Everything respects `prefers-reduced-motion`.

---

# Graphics Kit (v1.0, Oct 2026)

_Source: Claude Design handoff "DumbGTM Graphics Kit" (design_handoff_dumbgtm_graphics). High fidelity._
Everything follows the rules above: ink lines, 0 radius, no shadows, no gradients, blue only for links.

## §01 Icons (`src/lib/icons.ts`, `<Icon name size />`)
- 24x24 viewBox, 2px safe area, `stroke="currentColor"`, stroke 1.5, square caps, miter joins, no fills.
- Sizes: 16 (inline with 12px text, in buttons), 20 (nav), 24 (default), 48 (feature and stage markers).
  Above 24px add `vector-effect="non-scaling-stroke"` (the component does this).
- Inline SVG so currentColor inherits; decorative icons are `aria-hidden`; icon-only buttons need `aria-label`.
- Gap: 8px between icon and label in buttons, 6px in meta lines.
- Set: arrow-right, arrow-up-right (external), repeat, memo, folder, inbox, paperclip, stamp, pencil,
  clipboard, video, mail, megaphone, mug, check-box, x-box, clock (read time), search, menu, close.
- Mapping: "Read the blog" / "All posts" → arrow-right; YouTube → video; LinkedIn and external → arrow-up-right;
  read time → clock; contact → mail; mobile nav → menu / close.

## §02 Stage marks
§1 Dumb = single dot · §2 Working = rising line · §3 Everywhere = 3x3 dot grid · §4 Boring = two flat lines.
- Homepage lifecycle list: 48px mark above each "§N of 4".
- Memo row stage tag: 12px mark inside the outline tag, 6px gap: `[• §4 BORING]` (`StageBadge.astro`).
- Also used in Fig. 1 (32px) and share images (22px).

## §03 Rubber stamps (`Stamp.astro`, HTML/CSS, never images)
- Outer 2px solid currentColor, padding 3px; inner 1px, padding 6x14; Space Mono 700 18px uppercase, 0.12em.
- Fixed rotation per placement (-6° to 4°), never random. opacity .85, mix-blend-mode multiply.
- Ink by default; blue only when the stamp is a link. Sub-line variant: 9px uppercase line above/below;
  centre word can be Caslon 700 italic 22px ("CERTIFIED / Dumb / §1 of 4"). Inverse variant = CONFIDENTIAL.
- One stamp per view.
- Placements: PENDING APPROVAL over the top-right of the disabled YouTube/LinkedIn buttons (13px, solid memo
  background, full opacity, never covering a label); CERTIFIED DUMB on About and the homepage author block;
  FILED at the end of each article after the double rule; DENIED on the 404 page; RECEIVED (blue) for
  newsletter success; APPROVED on the default share image.
- Disabled buttons: 1px staple border, muted text, `aria-disabled`.

## §04 Paper ornaments
1. Redaction (`.redact`): ink background and ink text, padding 0 2px, `aria-label="redacted"`, no select.
   Fill with filler text of a natural width. Never put a real name in it (it is still in the page source).
2. Paperclipped card (`PaperclipCard.astro`): 1px ink border, padding 24/20/20; 40px paperclip at left 18px,
   top -20px, rotate -8°, memo background over the border; muted 11px label above ("ATTACHMENT A").
   For featured posts, embeds, attachments.
3. Three-hole punch (`HolePunch.astro`): 36px left gutter with hairline right border, three 12px carbon holes
   with a 1px inset ink ring, spaced evenly. Desktop article pages and About only; hidden under 900px.
4. Carbon copy (`.carbon-copy`): duplicate sheet behind the card, offset 6px/6px, 1px staple border, carbon
   fill. A hard offset, not a shadow. Only for §3 "Everywhere" content and quoted or reposted material.
5. Perforation (`.perforation`): 6/6 dashed ink rule either side of a centred 10px label
   ("DETACH · SUBSCRIBE", 0.12em). Above the newsletter form.
6. Ruled paper (`.ruled`): rule lines every 28px plus a staple margin line at 48px; line-height 28px,
   left padding 64px. Pull quotes and the contact form only, never under body copy.
7. Routing slip ("key takeaways" at the end of an article): bordered box, 10px bold header
   "ROUTING SLIP: PLEASE INITIAL"; rows `24px 1fr 60px`, 8x12 padding, hairlines; 16px check-box (do) or
   x-box (don't), text, underlined initials blank. (Not built yet.)
8. Figure caption: every article image is "Fig. N"; 1px ink border; caption Caslon italic 14px, 8px below,
   ending with a stage § when relevant ("Fig. 2: A pricing page that has given up §4").

## §05 Fig. 1: the dumb idea loop (`Fig1.astro`, homepage hero)
- Grid `1fr 40px 1fr 40px 1fr 40px 1fr`. Boxes: 1px ink border, padding 16, 12px gap, 32px stage mark,
  10px "§N", name in Caslon 22px. 24px arrow-right centred in each 40px column.
- §1 has a highlighter background ("you are here").
- Return line: 28px bracket under the row (1px ink, no top), inset 12.5% each side, "↻ REPEAT" centred on its
  bottom edge (14px repeat icon, 10px uppercase, 0.12em, memo background).
- Caption "Fig. 1: The dumb idea loop §1–§4", Caslon italic 14px.
- Under 640px: stacked, arrows rotated 90°, return bracket on the right.

## §06 Share images (`scripts/og-template.html`, 1200x630)
- Memo background, 64px/72px padding; header row with the wordmark SVG at 44px tall on the left, 2px ink rule, 20px below.
- Default: "DUMBGTM.COM" right (22px mono); memo header `120px 1fr` at 24px (TO: All Sales, Marketing &
  Whoever / RE: silly. goofy. dense. fun.); "So *dumb* it *might work.*" Caslon 104/1.02 with "dumb"
  highlighted; APPROVED stamp bottom-right (72px right, 56px bottom, -5°, borders 4px/2px, 30px text).
- Per memo: "MEMO 003" right plus stage tag (2px border, 18px text, 22px mark); title Caslon 72/1.08,
  max-width 1000px, punchline half in italics, 3 lines max, 60px over ~90 characters;
  footer "date · dumbgtm.com/blog" 22px muted; FILED stamp bottom-right at 4°.

## §07 Favicon
Superseded by the logo handoff below (the "d" mark replaces the memo-sheet favicon).

## Color additions (Oct 2026, at Ishan's request)
"A little color" for homepage sections 3 and 4, from the existing palette only:
- Section 3 "New stuff": carbon band; latest post as a paperclipped "Attachment A" card with a highlighter
  "New" tag.
- Section 4 video: highlighter panel with ink border. Buttons on it stay ink (never blue next to highlighter).

## Voice
- Write like an overly formal internal memo about something obvious.
- Bureaucratic framing: policies, forms, sections, acknowledgements.
- Original jokes only. No names, quotes, logos or other IP from any TV show.
- Copy style rules: no em dashes, no "this is not X, it's Y" setups, go easy on "actually", plain casual sentences over dramatic ones.

## Don'ts
- No rounded corners, shadows, gradients or emoji.
- No blue on anything that isn't clickable.
- No more than one highlight per screen.
- No long articles set in Space Mono.
- No third-party icon sets. Use the kit icons (§01) or text glyphs (⚠, §) in Space Mono.

---

# Logo (final, "Highlighted")

_Source: Claude Design handoff "DumbGTM Logo Guidelines" (design_handoff_dumbgtm_logo). Production assets live in `public/brand/` exactly as delivered._

The wordmark is Libre Caslon Text Bold converted to outlines, with a highlighter bar (#F5EE6A) behind "dumb".
The mark is the "d" on a highlighter square. Wordmark artboard 512x116 (about 4.41:1).

| File | Use |
|---|---|
| `dumbgtm-wordmark.svg` | **Primary.** Nav, footer, share images. On memo or white. |
| `dumbgtm-wordmark-inverse.svg` | On ink backgrounds (transparent bg, "gtm" in memo). Any future dark section. |
| `dumbgtm-wordmark-inverse-on-ink.svg` | Same with ink background baked in (email, docs, uploads). |
| `dumbgtm-wordmark-1color.svg` | One colour via currentColor, "dumb" knocked out of a solid bar. Print, stamps. |
| `dumbgtm-mark.svg` | "d" on highlighter square. App icon, avatar source. |
| `dumbgtm-mark-on-ink.svg` | Yellow "d" on ink square, for dark UIs. |
| `dumbgtm-mark-circle.svg` | Circular, only where a transparent round avatar is required. |
| `/favicon.svg` | 32px mark (site favicon). |
| `dumbgtm-mark-{16,32,48,180,192,512}.png` | Favicon / PWA / apple-touch-icon sizes. |
| `dumbgtm-avatar-1080.png` | YouTube, LinkedIn, X profile image (platforms crop to a circle). |
| `dumbgtm-wordmark-4x.png`, `dumbgtm-wordmark-on-ink-4x.png` | Raster fallbacks where SVG is rejected. |

Placement on the site:
- Nav: wordmark 22px tall (20px under 640px), linked home, `aria-label="dumbgtm home"`. Same on mobile (never the mark). Keep the 1px ink rule 12px below.
- Footer: wordmark 28px tall with the tagline below. Footer background is memo (not carbon) so the logo sits on an allowed background.
- Share images: wordmark 44px tall.
- Head: `/favicon.svg`, `/brand/dumbgtm-mark-32.png` (32x32), apple-touch-icon `/brand/dumbgtm-mark-180.png`; `site.webmanifest` lists 192 and 512 with background #F5EE6A and theme #FBFAF6.

Rules:
- Clear space: half the logo's height on every side (the nav rule may sit 12px below).
- Minimum size: wordmark 80px wide (about 18px tall); mark 16px.
- Backgrounds: only memo #FBFAF6, white or ink #141414. Never on blue, yellow or photos.
- Colours: only ink, highlighter and memo.
- Don't highlight "gtm", recolour the bar, rotate, stretch or add effects. Don't retype the logo in live text.
- Construction: Caslon Bold at 100 units, default kerning; bar from 0.1em before "d" to 0.1em after "b", 0.9em above
  the baseline to 0.2em below, square ends, running under the edge of the "g" on purpose; the mark's "d" is 72% of the
  square's height, optically centred.
