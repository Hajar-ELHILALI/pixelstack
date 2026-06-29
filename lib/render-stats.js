// Renders the pixel "HUD" stats panel as an SVG string.

import { getTheme } from './themes.js';
import { resolveTech } from './icons.js';
import { escapeXml, FONT } from './svg.js';

// GitHub logo (Octocat mark, smooth vector) shown in the panel header, via simple-icons.
const GITHUB_PATH = resolveTech('github').path;

const W = 300;
const PAD = 16;

function bar(value, cap) {
  return Math.max(0, Math.min(12, Math.round((value / cap) * 12)));
}

function fmtK(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
}

function panel(t, H, inner) {
  const logo = GITHUB_PATH
    ? `<g fill="${t.sprite}" transform="translate(${W - PAD - 22},7) scale(${22 / 24})"><path d="${GITHUB_PATH}"/></g>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W + 5}" height="${H + 5}" viewBox="0 0 ${W + 5} ${H + 5}" role="img" aria-label="GitHub stats">
  <rect x="5" y="5" width="${W}" height="${H}" fill="${t.shadow}"/>
  <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" fill="${t.panelBg}" stroke="${t.border}" stroke-width="3"/>
  <text x="${PAD}" y="26" font-family="${FONT}" font-size="12" letter-spacing="2" fill="${t.header}">&#9654; STATS</text>
  ${logo}
  <line x1="${PAD}" y1="44" x2="${W - PAD}" y2="44" stroke="${t.border}" stroke-width="2" stroke-dasharray="3 3"/>
  ${inner}
</svg>`;
}

export function renderStats({ stats, theme }) {
  const t = getTheme(theme);

  if (stats && stats.error) {
    const msg = `<text x="${PAD}" y="74" font-family="${FONT}" font-size="12" fill="${t.label}">${escapeXml(stats.error)}</text>`;
    return panel(t, 96, msg);
  }

  const rows = [
    { label: 'COMMITS', value: fmtK(stats.commits || 0), filled: bar(stats.commits || 0, 500), color: t.bars[0] },
    { label: 'REPOS', value: String(stats.repos || 0), filled: bar(stats.repos || 0, 30), color: t.bars[1] },
    { label: 'PULL REQ', value: String(stats.prs || 0), filled: bar(stats.prs || 0, 120), color: t.bars[2] },
    { label: 'CONTRIBS', value: fmtK(stats.contributions || 0), filled: bar(stats.contributions || 0, 700), color: t.bars[3] },
  ];

  const rowY0 = 70, step = 26;
  const H = rowY0 + step * (rows.length - 1) + 20;

  const inner = rows.map((r, i) => {
    const y = rowY0 + i * step;
    const filledStr = '█'.repeat(r.filled);
    const dimStr = '█'.repeat(12 - r.filled);
    return `<text x="${PAD}" y="${y}" font-family="${FONT}" font-size="12" letter-spacing="1" fill="${t.label}" dominant-baseline="central">${r.label}</text>
  <text x="${PAD + 126}" y="${y}" font-family="${FONT}" font-size="12" fill="${t.value}" text-anchor="end" dominant-baseline="central">${escapeXml(r.value)}</text>
  <text x="${PAD + 134}" y="${y}" font-family="${FONT}" font-size="13" letter-spacing="2" dominant-baseline="central"><tspan fill="${r.color}">${filledStr}</tspan><tspan fill="${t.dim}">${dimStr}</tspan></text>`;
  }).join('\n  ');

  return panel(t, H, inner);
}
