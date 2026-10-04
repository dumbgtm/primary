// "Fig. 1: The dumb idea loop" — hero chart math (hero loop handoff).
// Ported from the reference DumbIdeaLoop.jsx; every constant is the spec.
// One clock: elapsed seconds -> t = elapsed % LOOP. Shared by the server
// render (static frame) and the client animation.

export const C = {
  ink: '#141414', memo: '#FBFAF6', muted: '#5C5C56', rule: '#DAD8D0',
  staple: '#9A9A96', highlighter: '#F5EE6A',
};

export const SEG = 3;        // each of §1–§4
export const DRAW_END = 12;  // line finishes drawing
export const LOOP = 14;      // 12s stages + 2s repeat
export const STATIC_FRAME = 7.5; // reduced motion / no-JS: mid-§3

export const STAGES = [
  { n: '§1', name: 'Dumb', copy: 'Proposed in a meeting. Immediately laughed at.' },
  { n: '§2', name: 'Working', copy: 'Tried anyway. Numbers go up. Nobody knows why.' },
  { n: '§3', name: 'Everywhere', copy: 'Now it’s a carousel, a course, and 100 AI tools.' },
  { n: '§4', name: 'Boring', copy: 'Buyers have seen it 400 times. It’s in the playbook.' },
  { n: '↻', name: 'Repeat', copy: 'Someone in the back says “what if we…” Back to §1.' },
];

export const AXIS = { x0: 30, x1: 404, yTop: 14, yBase: 250 };
export const ZONES = [30, 122.5, 215, 307.5, 400];
export const RESULTS: number[][] = [[30, 236], [122, 230], [140, 205], [215, 72], [240, 50], [268, 54], [300, 84], [340, 98], [400, 100]];
export const EVERYONE: number[][] = [[30, 246], [150, 246], [200, 200], [260, 96], [300, 80], [340, 98], [400, 100]];
export const RETURN_ARC: number[][] = [[400, 100], [400, 4], [30, 4], [30, 236]];
export const ARC_D = `M${RETURN_ARC[0].join(' ')} C${RETURN_ARC[1].join(' ')} ${RETURN_ARC[2].join(' ')} ${RETURN_ARC[3].join(' ')}`;

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
const easeInOut = (x: number) => {
  x = clamp(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const bezier = ([p0, p1, p2, p3]: number[][], u: number) => {
  const v = 1 - u;
  return [0, 1].map((k) => v * v * v * p0[k] + 3 * v * v * u * p1[k] + 3 * v * u * u * p2[k] + u * u * u * p3[k]);
};
// Polyline truncated at x, with an interpolated end point.
const upTo = (pts: number[][], x: number) => {
  const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    if (b[0] <= x) out.push(b);
    else {
      if (x > a[0]) out.push([x, lerp(a[1], b[1], (x - a[0]) / (b[0] - a[0]))]);
      break;
    }
  }
  return out;
};
export const toPoints = (pts: number[][]) => pts.map((p) => p.join(',')).join(' ');

export function frame(elapsed: number) {
  const t = elapsed % LOOP;
  const cycle = Math.floor(elapsed / LOOP);

  const repeating = t >= DRAW_END;
  const si = repeating ? 4 : Math.min(3, Math.floor(t / SEG));
  const stageStart = repeating ? DRAW_END : si * SEG;
  const stageDur = repeating ? LOOP - DRAW_END : SEG;
  const loc = t - stageStart;

  const x = AXIS.x0 + (400 - AXIS.x0) * clamp(t / DRAW_END);
  const res = upTo(RESULTS, x);
  const evr = upTo(EVERYONE, x);

  const toGhost = repeating ? easeOut((t - 12) / 0.5) : 0;       // 12.0–12.5 line -> ghost grey
  const arcDraw = repeating ? clamp((t - 12.3) / 0.8) : 0;       // 12.3–13.1 arc draws on
  const arcU = easeInOut((t - 12.3) / 1.0);                      // 12.3–13.3 marker rides arc
  const arcFade = t > 13.3 ? 1 - clamp((t - 13.3) / 0.5) : 1;    // 13.3–13.8 arc fades
  const land = repeating && t > 13.3 ? easeOut((t - 13.3) / 0.3) : 0;
  const bounce = land ? Math.sin(land * Math.PI) * 6 : 0;        // 6-unit hop on landing

  let head = res[res.length - 1];
  if (repeating) head = t < 12.3 ? RESULTS[RESULTS.length - 1] : bezier(RETURN_ARC, arcU);

  const ghostPrevOpacity = cycle > 0 ? (repeating ? 1 - toGhost : 1) : 0;
  const ghostLabelOpacity = repeating ? 1 : 1 - clamp((x - 90) / 30);

  const isNew = repeating ? t > 12.3 : cycle > 0 && t < 1.6;
  const label = isNew ? 'NEW DUMB IDEA' : 'YOU ARE HERE';
  const labelW = isNew ? 104 : 88;
  const labelX = Math.max(AXIS.x0 + labelW / 2 - 10, Math.min(head[0], AXIS.x1 - labelW / 2));
  const labelY = head[1] - 18 - bounce;
  const activeZone = repeating ? 0 : si;
  const captionIn = easeOut(loc / 0.4);

  const evrEnd = evr[evr.length - 1];
  return {
    t, cycle, si, loc, stageDur, repeating, x,
    resPoints: toPoints(res),
    resStroke: toGhost > 0.5 ? C.rule : C.ink,
    resWidth: lerp(2.5, 2, toGhost),
    evrPoints: toPoints(evr),
    evrOpacity: 1 - toGhost,
    evrLabel: { show: x > 260, x: Math.min(x, 330) - 6, y: evrEnd[1] + 30, opacity: clamp((x - 260) / 30) },
    ghostPrevOpacity, ghostLabelOpacity,
    arcOpacity: repeating ? arcFade : 0,
    arcOffset: 1 - arcDraw,
    arrowOpacity: arcDraw >= 1 ? 1 : 0,
    head: [head[0], head[1] - bounce],
    isNew, label, labelW, labelX, labelY, activeZone, captionIn,
    progress: (loc / stageDur) * 100,
  };
}
