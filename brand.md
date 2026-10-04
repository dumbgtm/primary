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

Logo: the word `dumbgtm` in Caslon 700, 18px, lowercase. Text only, no mark.
(Favicon is a black square with a Caslon "d", since a favicon needs a shape.)

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
The one exception is Fig. 1, the dumb idea loop on the homepage, which is the site's central idea.
Everything respects `prefers-reduced-motion`.

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
- No icon sets. Use text glyphs (→, ⚠, §) in Space Mono.
