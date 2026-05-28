#!/usr/bin/env python3
"""
Second pass: fix remaining GA remnants and missing nav links
"""
import os, re

SITE = "/mnt/g/OpenClawData/.openclaw/workspace/infinity-nikki-guide"
FIX_FILES = [
    "beginner.html", "challenges.html", "codes.html", 
    "dewdrops.html", "materials.html", "outfits.html", 
    "privacy.html", "whimstars.html", "index.html"
]

# The remnant pattern in these files is:
#     <!-- Google tag (gtag.js) -->
#     <script>
#       window.dataLayer = window.dataLayer || [];
# </head>
# (the closing </script> was already removed, but the opening <script> and
# the dataLayer line remain, and the </head> is now connected directly)

for fn in FIX_FILES:
    fp = os.path.join(SITE, fn)
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()
    orig = c
    
    # Fix remnant GA: remove <!-- Google tag... line, <script>, and window.dataLayer line
    c = re.sub(r'\s*<!-- Google tag.*?\n\s*<script>\s*\n\s*window\.dataLayer.*?\n', '\n', c)
    
    # Fix: if there's a </script> remnant somewhere, remove it
    c = re.sub(r'\n\s*</script>\s*\n', '\n', c)
    
    # Add about nav link if missing
    if '<a href="about.html">关于</a>' not in c:
        c = c.replace(
            '<li><a href="beginner.html">新手攻略</a></li>',
            '<li><a href="beginner.html">新手攻略</a></li>\n                    <li><a href="about.html">关于</a></li>'
        )
    
    # Add about footer link if missing
    if '关于我们' not in c and '<a href="about.html">关于我们</a>' not in c:
        c = c.replace(
            '<a href="privacy.html">隐私政策</a>',
            '<a href="privacy.html">隐私政策</a> | <a href="about.html">关于我们</a>'
        )
    
    while '\n\n\n' in c:
        c = c.replace('\n\n\n', '\n\n')
    
    if c != orig:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Fixed: {fn}")
    else:
        print(f"No changes: {fn}")

print("Done!")