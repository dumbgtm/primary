import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { STAGES } from '../lib/site';

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI crawlers and assistants.
export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const ideas = (await getCollection('ideas', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const base = site!.href.replace(/\/$/, '');
  const lines = [
    '# dumbGTM',
    '',
    '> dumbGTM is an independent blog about go-to-market (GTM) and B2B marketing tactics: which "dumb" contrarian ideas work, why they work, and what happens once everyone copies them. Every post is tagged with where the tactic sits in the dumb idea loop: Dumb, Working, Everywhere or Boring. dumbGTM does not sell marketing software.',
    '',
    'The dumb idea loop: (1) Dumb: someone suggests a contrarian idea and people laugh. (2) Working: someone tries it and it works, partly because nobody else does it. (3) Everywhere: everyone copies it. (4) Boring: buyers have seen it hundreds of times and results flatten.',
    '',
    '## Blog posts',
    '',
    ...posts.map((p) => {
      const stage = p.data.stage ? ` [Stage: ${STAGES[p.data.stage].label}]` : '';
      return `- [${p.data.title}](${base}/blog/${p.slug}/): ${p.data.description}${stage}`;
    }),
    '',
    '## Dumb Ideas (long-form visual pieces)',
    '',
    ...(ideas.length
      ? ideas.map((p) => `- [${p.data.title}](${base}/dumb-ideas/${p.slug}/): ${p.data.description}${p.data.stage ? ` [Stage: ${STAGES[p.data.stage].label}]` : ''}`)
      : ['- None published yet.']),
    '',
    '## Optional',
    '',
    `- [Full text of all posts](${base}/llms-full.txt): every post in plain markdown`,
    `- [About](${base}/about/)`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
