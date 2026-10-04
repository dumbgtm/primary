// Social channel links. Leave a value empty and its button shows as
// "pending approval" instead of linking anywhere.
export const YOUTUBE_URL = '';
export const LINKEDIN_URL = '';

// The four stages of the dumb idea loop.
export const STAGES = {
  dumb: { n: 1, label: 'Dumb' },
  working: { n: 2, label: 'Working' },
  everywhere: { n: 3, label: 'Everywhere' },
  boring: { n: 4, label: 'Boring' },
} as const;

export type Stage = keyof typeof STAGES;
export const STAGE_KEYS = Object.keys(STAGES) as Stage[];
