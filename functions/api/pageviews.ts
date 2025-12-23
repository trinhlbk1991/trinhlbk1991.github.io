// Cloudflare Pages Function for Page View Counter
// Uses Cloudflare KV for storage (free tier: 100k reads/day, 1k writes/day)

export async function onRequest(context) {
  const { request, env } = context;
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(request.url);
    const pageKey = url.searchParams.get('page');
    
    if (!pageKey) {
      return new Response(
        JSON.stringify({ error: 'Missing page parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get current count from KV
    const currentCount = await env.PAGEVIEWS?.get(pageKey);
    const count = currentCount ? parseInt(currentCount) : 0;
    
    // Increment count
    const newCount = count + 1;
    await env.PAGEVIEWS?.put(pageKey, newCount.toString());

    return new Response(
      JSON.stringify({ page: pageKey, views: newCount }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update page views', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
