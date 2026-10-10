import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { STAGES } from '../lib/site';

// Full text of every post in markdown, for AI assistants that read llms-full.txt.
export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const base = site!.href.replace(/\/$/, '');
  const out = ['# dumbGTM: full text of all posts', ''];
  for (const p of posts) {
    out.push(`# ${p.data.title}`, '');
    out.push(`URL: ${base}/blog/${p.slug}/`);
    out.push(`Published: ${p.data.pubDate.toISOString().slice(0, 10)}`);
    if (p.data.stage) out.push(`Stage: ${STAGES[p.data.stage].label}`);
    out.push('', `> ${p.data.description}`, '', p.body.trim(), '');
    if (p.data.faq.length) {
      out.push('## Frequently asked questions', '');
      for (const f of p.data.faq) out.push(`### ${f.q}`, '', f.a, '');
    }
    if (p.data.sources.length) {
      out.push('## Sources', '');
      p.data.sources.forEach((s, i) => out.push(`${i + 1}. [${s.title}](${s.url})${s.publisher ? `, ${s.publisher}` : ''}${s.date ? `, ${s.date}` : ''}`));
      out.push('');
    }
    out.push('---', '');
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
