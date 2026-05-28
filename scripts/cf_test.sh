#!/bin/bash
# Cloudflare cache purge test script
# Usage: Replace TOKEN and ZONE_ID with your own
curl -s -X POST \
  "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'
