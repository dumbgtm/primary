// Social channel links. Leave a value empty and its button shows as
// "pending approval" instead of linking anywhere.
export const YOUTUBE_URL = '';
export const LINKEDIN_URL = '';

// The four stages of the dumb idea loop, with their stage marks.
export const STAGES = {
  dumb: { n: 1, label: 'Dumb', mark: 'stage-1-dumb', blurb: 'A single dot. Alone, unproven.' },
  working: { n: 2, label: 'Working', mark: 'stage-2-working', blurb: 'The line goes up. Suspiciously.' },
  everywhere: { n: 3, label: 'Everywhere', mark: 'stage-3-everywhere', blurb: 'Nine copies of the same dot.' },
  boring: { n: 4, label: 'Boring', mark: 'stage-4-boring', blurb: 'Two flat lines. Same as everyone.' },
} as const;

export type Stage = keyof typeof STAGES;
export const STAGE_KEYS = Object.keys(STAGES) as Stage[];

// Rough read time for a markdown body (230 wpm, minimum 1 minute).
export const readTime = (body: string) => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 230));
