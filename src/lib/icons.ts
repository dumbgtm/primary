// dumbGTM icon set (Graphics Kit §01–§02). 24x24 grid, 1.5px stroke,
// square caps, miter joins, stroke only, currentColor. Source: Claude Design
// handoff "design_handoff_dumbgtm_graphics/icons/*.svg".
export const ICONS = {
  'arrow-right': '<path d="M4 12h16"/><path d="M14 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M6 18L18 6"/><path d="M8 6h10v10"/>',
  'check-box': '<path d="M4 4h16v16H4z"/><path d="M8 12l3 3 5-6"/>',
  clipboard: '<path d="M5 5h14v16H5z"/><path d="M9 3h6v4H9z"/><path d="M8 12h8M8 15h8M8 18h5"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  folder: '<path d="M3 6h6l2 2h10v11H3z"/>',
  inbox: '<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>',
  mail: '<path d="M3 6h18v12H3z"/><path d="M3 6l9 7 9-7"/>',
  megaphone: '<path d="M4 10v4h3l8 4V6l-8 4z"/><path d="M18 9a4 4 0 0 1 0 6"/><path d="M7 14l1 5h2l-1-4.5"/>',
  memo: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 15h6M9 18h3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  mug: '<path d="M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M9 3v2M12 3v2"/>',
  paperclip: '<path d="M15 7v9a3 3 0 0 1-6 0V6a2 2 0 0 1 4 0v9a1 1 0 0 1-2 0V8"/>',
  pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
  repeat: '<path d="M19 12a7 7 0 1 1-2.05-4.95"/><path d="M17 3v4.05h-4"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20"/>',
  stamp: '<path d="M4 17h16v3H4z"/><path d="M7 17v-3h10v3"/><path d="M10 14V9.5M14 14V9.5"/><circle cx="12" cy="6.5" r="3"/>',
  video: '<path d="M3 5h18v14H3z"/><path d="M10 9l5 3-5 3z"/>',
  'x-box': '<path d="M4 4h16v16H4z"/><path d="M8 8l8 8M16 8l-8 8"/>',
  // Stage marks
  'stage-1-dumb': '<circle cx="12" cy="12" r="3"/>',
  'stage-2-working': '<path d="M4 18l6-6 4 3 6-9"/><path d="M15 6h5v5"/>',
  'stage-3-everywhere':
    '<circle cx="6" cy="6" r="1.5"/><circle cx="12" cy="6" r="1.5"/><circle cx="18" cy="6" r="1.5"/>' +
    '<circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>' +
    '<circle cx="6" cy="18" r="1.5"/><circle cx="12" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/>',
  'stage-4-boring': '<path d="M4 10h16M4 14h16"/>',
} as const;

export type IconName = keyof typeof ICONS;
