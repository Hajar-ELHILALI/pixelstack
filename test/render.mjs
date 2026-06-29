// Quick local check of the SVG renderers (no Next.js, no network needed).
//   node test/render.mjs   ->  writes test/out-*.svg

import { writeFileSync } from 'node:fs';
import { renderStack } from '../lib/render-stack.js';
import { renderStats } from '../lib/render-stats.js';

const out = (name, svg) => {
  writeFileSync(new URL(`./out-${name}.svg`, import.meta.url), svg);
  const ok = svg.startsWith('<svg') && svg.trimEnd().endsWith('</svg>');
  console.log(`${ok ? 'OK ' : 'BAD'}  out-${name}.svg  (${svg.length} bytes)`);
};

out(
  'stack-midnight',
  renderStack({
    stack: 'java,javascript,dart,sql,spring-boot,hibernate,rest-apis,jwt,maven,docker,git,github',
    theme: 'midnight',
  })
);
out('stack-dracula', renderStack({ stack: 'java,spring-boot,docker', theme: 'dracula' }));
out('stats-midnight', renderStats({ stats: { commits: 1200, repos: 24, prs: 38, contributions: 445 }, theme: 'midnight' }));
out('stats-dracula', renderStats({ stats: { commits: 1200, repos: 24, prs: 38, contributions: 445 }, theme: 'dracula' }));
out('stats-error', renderStats({ stats: { error: 'GITHUB_TOKEN non configure' }, theme: 'midnight' }));
