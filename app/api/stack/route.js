// GET /api/stack?stack=java,spring-boot,docker&theme=midnight  -> SVG image

import { renderStack } from '../../../lib/render-stack.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(request) {
  const { searchParams } = new URL(request.url);
  const stack = searchParams.get('stack') || '';
  const theme = searchParams.get('theme') || 'midnight';

  let svg;
  try {
    svg = renderStack({ stack, theme });
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
