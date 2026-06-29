// Renders the tech-stack badges (real logo + name on a pixel background) as SVG.

import { getTheme } from './themes.js';
import { resolveTech } from './icons.js';
import { escapeXml, FONT, textWidth } from './svg.js';

const BH = 32;        // badge height
const PADX = 12;      // horizontal padding inside a badge
const GAP = 8;        // gap between logo and name
const ICON = 16;      // logo size
const FS = 12;        // name font size
const GX = 12;        // gap between badges
const GY = 12;        // gap between rows
const MAXW = 760;     // wrap width

export function renderStack({ stack, theme }) {
  const t = getTheme(theme);

  const techs = String(stack || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(resolveTech);
  if (!techs.length) techs.push(resolveTech('github'));

  const items = techs.map((tech) => ({
    ...tech,
    w: Math.round(PADX + ICON + GAP + textWidth(tech.name, FS) + PADX),
  }));

  // flow layout with wrapping
  let x = 0, y = 0, rowW = 0, maxRowW = 0;
  for (const it of items) {
    if (x > 0 && x + it.w > MAXW) {
      maxRowW = Math.max(maxRowW, rowW - GX);
      x = 0;
      y += BH + GY;
    }
    it.x = x;
    it.y = y;
    x += it.w + GX;
    rowW = x;
  }
  maxRowW = Math.max(maxRowW, rowW - GX);
  const totalW = maxRowW;
  const totalH = y + BH;

  const pattern = `<pattern id="ps-grid" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${t.badgeBg}"/><path d="M4 0V4M0 4H4" stroke="${t.grid}" stroke-width="1"/></pattern>`;

  const badges = items.map((it) => {
    const iconY = it.y + (BH - ICON) / 2;
    const icon = it.path
      ? `<g transform="translate(${it.x + PADX},${iconY}) scale(${ICON / 24})" fill="${it.color}"><path d="${it.path}"/></g>`
      : `<rect x="${it.x + PADX + 2}" y="${iconY + 2}" width="12" height="12" fill="${it.color}"/>`;
    const textX = it.x + PADX + ICON + GAP;
    return `<rect x="${it.x + 3}" y="${it.y + 3}" width="${it.w}" height="${BH}" fill="${t.shadow}"/>
  <rect x="${it.x}" y="${it.y}" width="${it.w}" height="${BH}" fill="url(#ps-grid)"/>
  <rect x="${it.x + 1}" y="${it.y + 1}" width="${it.w - 2}" height="${BH - 2}" fill="none" stroke="${t.border}" stroke-width="2"/>
  ${icon}
  <text x="${textX}" y="${it.y + BH / 2}" font-family="${FONT}" font-size="${FS}" fill="${t.name}" dominant-baseline="central">${escapeXml(it.name)}</text>`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW + 3}" height="${totalH + 3}" viewBox="0 0 ${totalW + 3} ${totalH + 3}" role="img" aria-label="tech stack">
  <defs>${pattern}</defs>
  ${badges}
</svg>`;
}
