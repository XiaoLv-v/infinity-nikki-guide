#!/usr/bin/env python3
"""
Third pass: add about nav link to all pages handling class="active" variants
"""
import os, re

SITE = "/mnt/g/OpenClawData/.openclaw/workspace/infinity-nikki-guide"

for fn in os.listdir(SITE):
    if not fn.endswith(".html") or fn == "about.html":
        continue
    fp = os.path.join(SITE, fn)
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()
    orig = c

    # Add nav link after any beginner.html nav item
    # Pattern: <li><a href="beginner.html" ...>新手攻略</a></li>
    c = re.sub(
        r'(<li><a href="beginner\.html"[^>]*>新手攻略</a></li>)',
        r'\1\n                    <li><a href="about.html">关于</a></li>',
        c
    )

    # Add footer link
    c = re.sub(
        r'(<a href="privacy\.html">隐私政策</a>)',
        r'\1 | <a href="about.html">关于我们</a>',
        c
    )

    while '\n\n\n' in c:
        c = c.replace('\n\n\n', '\n\n')

    if c != orig:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Fixed: {fn}")
    else:
        print(f"OK: {fn}")

print("Done!")