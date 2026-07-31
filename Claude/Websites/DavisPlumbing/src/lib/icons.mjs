/**
 * Inline SVG icons (currentColor). Kept minimal and consistent (1.6 stroke,
 * 24x24 viewbox) so they read as one family. Inlining avoids extra requests.
 */
const P = 'stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"';

export const icons = {
  home: `<svg viewBox="0 0 24 24" ${P}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>`,
  building: `<svg viewBox="0 0 24 24" ${P}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M10 21v-3h4v3"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" ${P}><path d="M14.7 6.3a4 4 0 0 0-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 0 0 5-5.4l-2.3 2.3-2.1-.6-.6-2.1z"/></svg>`,
  blueprint: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h6v11M15 4v7h6M9 4v5h6"/></svg>`,
  family: `<svg viewBox="0 0 24 24" ${P}><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.2"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0M14.5 20a4.5 4.5 0 0 1 7 0"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" ${P}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" ${P}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="m9 12 2 2 4-4"/></svg>`,
  handshake: `<svg viewBox="0 0 24 24" ${P}><path d="m11 17-2.5 2.5a1.4 1.4 0 0 1-2-2L9 15"/><path d="M4 13l4-4 3 2 3-3 6 6"/><path d="M13 8l3-3 4 4-2 2"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" ${P}><path d="M6 3h3l1.5 5-2 1.5a11 11 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" ${P}><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" ${P}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.6 6.1 21l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" ${P}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  check: `<svg viewBox="0 0 24 24" ${P}><path d="m5 12 5 5 9-11"/></svg>`,
  award: `<svg viewBox="0 0 24 24" ${P}><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>`,
  drop: `<svg viewBox="0 0 24 24" ${P}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>`,
  tools: `<svg viewBox="0 0 24 24" ${P}><path d="M14.5 5.5a3.5 3.5 0 0 1 4.9 4.2l-2.4-1.2-1.3 1.3 1.2 2.4a3.5 3.5 0 0 1-4.2-4.9"/><path d="M12 12 5 19a1.8 1.8 0 0 1-2.5-2.5L9.5 9.5"/></svg>`,
  quote: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H6a1 1 0 0 1 1-1h3zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-4a1 1 0 0 1 1-1h3z" opacity=".5"/></svg>`,
  zoom: `<svg viewBox="0 0 24 24" ${P}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4M11 8v6M8 11h6"/></svg>`,
  close: `<svg viewBox="0 0 24 24" ${P}><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  chevronL: `<svg viewBox="0 0 24 24" ${P}><path d="m15 6-6 6 6 6"/></svg>`,
  chevronR: `<svg viewBox="0 0 24 24" ${P}><path d="m9 6 6 6-6 6"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M14 9h3V5h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" ${P}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>`,
  yelp: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11 3.5c-2 .3-3.8 1-3.8 1.9 0 .5 4.4 6.6 5.1 6.7.7.1 1-.4 1-3.4 0-4.6-.2-5.4-2.3-5.2zM7 12.7c-2.2.7-3.7 1.4-3.7 2 0 .8 3.6 1.7 4.4 1.3.6-.3.4-.9-.7-3.3zM9.3 17.3c-1.4 1.9-2 2.9-1.6 3.4.5.6 3.5-.7 4-1.6.3-.6-.1-1-1.4-1.9-.7-.5-.8-.4-1 .1zM15.6 16.6c-1.9-.8-2.5-.7-2.5.4 0 1.2 1.3 3.6 2 3.6.7 0 2.4-2 2.4-2.7 0-.4-.6-.8-1.9-1.3zM14.5 12.4c-.4.9.1 1.3 2.3 1.9 2 .5 2.6.4 2.7-.4.1-.9-1.4-2.9-2.2-2.9-.4 0-1.9.9-2.8 1.4z"/></svg>`,
  google: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7.1z"/><path d="M12 21c2.4 0 4.5-.8 6-2.2l-3.1-2.4c-.8.6-1.9.9-2.9.9-2.3 0-4.2-1.5-4.9-3.6H3.9v2.5A9 9 0 0 0 12 21z" opacity=".8"/><path d="M7.1 13.7a5.4 5.4 0 0 1 0-3.4V7.8H3.9a9 9 0 0 0 0 8.4z" opacity=".6"/><path d="M12 6.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 3.9 7.8l3.2 2.5C7.8 8.1 9.7 6.6 12 6.6z" opacity=".9"/></svg>`,
};

export const icon = (name) => icons[name] || '';
