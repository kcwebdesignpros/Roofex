/**
 * Inline SVG icon set (stroke-based, 24x24, currentColor).
 * Kept inline so pages need zero icon-font or extra requests.
 */

const paths = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 21l-3 0-9.6-9.6a4 4 0 0 1-5-5L6 3.7l4.2 4.2 2.1-2.1z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  droplet: '<path d="M12 3s6 6.4 6 10.4A6 6 0 0 1 6 13.4C6 9.4 12 3 12 3Z"/>',
  storm: '<path d="M7 15a4 4 0 0 1 .4-8 5.5 5.5 0 0 1 10.5 1.5A3.5 3.5 0 0 1 17.5 15"/>',
  siren: '<path d="M12 3v2M5 8 3.5 6.5M19 8l1.5-1.5"/><path d="M7 18v-4a5 5 0 0 1 10 0v4"/><rect x="4" y="18" width="16" height="3" rx="1.5"/>',
  phone: '<path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  check: '<path d="m4 12.5 5 5L20 6.5"/>',
  arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 14.5A6 6 0 0 1 21 20"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  tag: '<path d="M3 12.5V4a1 1 0 0 1 1-1h8.5L21 11.5 12.5 20 3 12.5Z"/><circle cx="8" cy="8" r="1.4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6 18 18M18 6 6 18"/>',
  quote: '<path d="M9 7H5.5A1.5 1.5 0 0 0 4 8.5V12a1.5 1.5 0 0 0 1.5 1.5H8v1A3.5 3.5 0 0 1 4.5 18M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12a1.5 1.5 0 0 0 1.5 1.5H18v1A3.5 3.5 0 0 1 14.5 18"/>',
  facebook: '<path d="M14 8.5h2.5V5.5H14A4 4 0 0 0 10 9.5V12H7.5v3H10v6h3v-6h2.5l.5-3H13v-2a1.5 1.5 0 0 1 1-1.5Z"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10.5V17M8 7.5v.01M12 17v-3.5a2 2 0 0 1 4 0V17"/>',
  youtube: '<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="m11 9.5 4 2.5-4 2.5v-5Z"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  dollar: '<path d="M12 3v18"/><path d="M16.5 7.5c0-2-2-3-4.5-3s-4.5 1-4.5 3S10 11 12 11.5s5 1.5 5 3.5-2 3-5 3-5-1-5-3"/>',
  tool: '<path d="M6 3h4v4H6zM14 17h4v4h-4z"/><path d="M8 7v6a4 4 0 0 0 4 4h2"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
};

function icon(name, size = 24, cls = '') {
  const p = paths[name] || paths.check;
  return `<svg class="ico ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`;
}

module.exports = { icon, names: Object.keys(paths) };
