// Renders the icon tiles (logo on a pixel background) as an SVG string.
// Square tiles, no text — just the logo, scattered pixel accents, pixel border.

import { getTheme } from './themes.js';
import { resolveTech } from './icons.js';

const T = 58;     // tile size
const GAP = 14;   // gap between tiles
const LOGO = 26;  // logo size
const MAXW = 760; // wrap width

export function renderIcons({ stack, theme }) {
  const t = getTheme(theme);

  const techs = String(stack || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(resolveTech);
  if (!techs.length) techs.push(resolveTech('github'));

  const cols = Math.min(techs.length, Math.max(1, Math.floor((MAXW + GAP) / (T + GAP))));
  const rows = Math.ceil(techs.length / cols);
  const totalW = cols * T + (cols - 1) * GAP;
  const totalH = rows * T + (rows - 1) * GAP;

  const pattern = `<pattern id="ps-grid" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${t.badgeBg}"/><path d="M4 0V4M0 4H4" stroke="${t.grid}" stroke-width="1"/></pattern>`;

  const tiles = techs.map((tech, i) => {
    const x = (i % cols) * (T + GAP);
    const y = Math.floor(i / cols) * (T + GAP);
    const lx = x + (T - LOGO) / 2;
    const ly = y + (T - LOGO) / 2;

    const accent = (ax, ay, op) =>
      `<rect x="${x + ax}" y="${y + ay}" width="4" height="4" fill="${tech.color}" opacity="${op}"/>`;

    const logo = tech.path
      ? `<g transform="translate(${lx},${ly}) scale(${LOGO / 24})" fill="${tech.color}"><path d="${tech.path}"/></g>`
      : `<rect x="${x + (T - 16) / 2}" y="${y + (T - 16) / 2}" width="16" height="16" fill="${tech.color}"/>`;

    return `<rect x="${x + 4}" y="${y + 4}" width="${T}" height="${T}" fill="${t.shadow}"/>
  <rect x="${x}" y="${y}" width="${T}" height="${T}" fill="url(#ps-grid)"/>
  <rect x="${x + 1.5}" y="${y + 1.5}" width="${T - 3}" height="${T - 3}" fill="none" stroke="${t.border}" stroke-width="3"/>
  ${accent(6, 7, 0.5)}${accent(T - 12, 12, 0.35)}${accent(11, T - 12, 0.3)}
  ${logo}`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW + 4}" height="${totalH + 4}" viewBox="0 0 ${totalW + 4} ${totalH + 4}" role="img" aria-label="tech icons">
  <defs>${pattern}</defs>
  ${tiles}
</svg>`;
}
