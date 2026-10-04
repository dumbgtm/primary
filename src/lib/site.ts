// Social channel links. Leave a value empty and its button shows as "coming soon"
// instead of linking anywhere.
export const YOUTUBE_URL = '';
export const LINKEDIN_URL = '';

// The four stages of the dumb idea loop. Colours fade from Siren to Slate.
export const STAGES = {
  dumb: { n: 1, label: 'Dumb', color: '#D64045' },
  working: { n: 2, label: 'Working', color: '#AD4E5A' },
  everywhere: { n: 3, label: 'Everywhere', color: '#845D70' },
  boring: { n: 4, label: 'Boring', color: '#5B6B85' },
} as const;

export type Stage = keyof typeof STAGES;
export const STAGE_KEYS = Object.keys(STAGES) as Stage[];
