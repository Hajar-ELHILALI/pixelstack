// GET /api/stats?user=Hajar-ELHILALI&theme=midnight  -> SVG image
// Needs the GITHUB_TOKEN environment variable.

import { fetchStats } from '../../../lib/github.js';
import { renderStats } from '../../../lib/render-stats.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user') || '';
  const theme = searchParams.get('theme') || 'midnight';
  const token = process.env.GITHUB_TOKEN;

  let svg;
  try {
    if (!user) throw new Error('parametre ?user= manquant');
    if (!token) throw new Error('GITHUB_TOKEN non configure');
    const stats = await fetchStats(user, token);
    svg = renderStats({ stats, theme });
  } catch (e) {
    // Render the message inside the panel so the README shows what went wrong.
    svg = renderStats({ stats: { error: e.message }, theme });
  }

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=7200, stale-while-revalidate=86400',
    },
  });
}
