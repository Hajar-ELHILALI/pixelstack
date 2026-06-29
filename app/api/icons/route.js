// GET /api/icons?stack=java,spring-boot,docker&theme=midnight  -> SVG image
// Square logo tiles (logo on a pixel background).

import { renderIcons } from '../../../lib/render-icons.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const stack = searchParams.get('stack') || '';
  const theme = searchParams.get('theme') || 'midnight';

  let svg;
  try {
    svg = renderIcons({ stack, theme });
  } catch (e) {
    return new Response('error: ' + e.message, { status: 500 });
  }

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
