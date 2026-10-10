"""Render a blog share image (1200x630) from scripts/og-template.html with local fonts.

Usage (from the website folder, after `npm install`):
  python3 scripts/make-og.py <slug> memo=004 stage=3 "date=Oct 10, 2026" \
      "title=Post title" "italic=punchline part" "fig=AI SDRs" "caption=Short caption."
Writes public/og/blog/<slug>.png. Needs: pip install playwright (Chromium installed).
"""
import functools, http.server, re, sys, threading, urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
slug, pairs = sys.argv[1], dict(a.split('=', 1) for a in sys.argv[2:])
pairs.setdefault('mode', 'memo')

fonts = ''.join(
    f"@font-face{{font-family:'{fam}';font-style:{st};font-weight:{w};src:url(/node_modules/@fontsource/{pkg}/files/{pkg}-latin-{w}-{st}.woff2)}}"
    for fam, pkg, w, st in [
        ('Libre Caslon Text', 'libre-caslon-text', 400, 'normal'), ('Libre Caslon Text', 'libre-caslon-text', 400, 'italic'),
        ('Libre Caslon Text', 'libre-caslon-text', 700, 'normal'), ('Space Mono', 'space-mono', 400, 'normal'),
        ('Space Mono', 'space-mono', 700, 'normal')])
tmp = root / 'scripts' / '_og-local.html'
tmp.write_text(re.sub(r"@import url\('https://fonts\.googleapis\.com[^']*'\);", fonts, (root / 'scripts/og-template.html').read_text()))

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root))
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()
try:
    url = f'http://127.0.0.1:{srv.server_port}/scripts/_og-local.html?' + urllib.parse.urlencode(pairs)
    out = root / 'public/og/blog' / f'{slug}.png'
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 1200, 'height': 630})
        pg.add_init_script("window.LOGO_SRC='/public/brand/dumbgtm-wordmark.svg'")
        pg.goto(url); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(500)
        pg.screenshot(path=str(out))
        b.close()
    print(out)
finally:
    srv.shutdown(); tmp.unlink(missing_ok=True)
