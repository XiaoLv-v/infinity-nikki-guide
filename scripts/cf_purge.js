// Cloudflare cache purge
// Usage: CF_API_TOKEN=xxx node cf_purge.js
async function main() {
  const CLOUDFLARE_ZONE = '98efab2644efe212a425b43b11248e28';
  const CLOUDFLARE_TOKEN = process.env.CF_API_TOKEN || '';
  
  if (!CLOUDFLARE_TOKEN) {
    console.error('Error: CF_API_TOKEN environment variable not set');
    process.exit(1);
  }
  
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE}/purge_cache`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ purge_everything: true })
  });
  
  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Success:', data.success);
  if (!data.success) console.log('Errors:', JSON.stringify(data.errors));
}
main().catch(e => console.error(e));
