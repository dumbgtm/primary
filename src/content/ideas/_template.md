---
# Template for a Dumb Ideas piece. Files starting with "_" are never published.
# Copy this file to src/content/ideas/<slug>.md and fill it in.
title: "Title of the idea"
description: "One or two sentences. Shown under the title, on the Dumb Ideas page and in search results."
pubDate: 2026-10-20
stage: "dumb"            # dumb | working | everywhere | boring
tags: ["tag-one"]
# cover: "/ideas/<slug>/cover.png"   # optional card image; defaults to the share image /og/ideas/<slug>.png
faq: []                  # optional, same format as blog posts
sources: []              # optional, same format as blog posts
---

## Slide 1 heading

![Describe the image for screen readers](/ideas/<slug>/slide-1.png)

Up to ~200 words of text for this slide. The first image in a slide becomes the slide's visual
(left on desktop, on top on mobile). Put slide images in public/ideas/<slug>/.

---

## Slide 2 heading

Each `---` line starts a new slide. Leave a blank line before and after it.
A slide without an image gets a text-only layout.
