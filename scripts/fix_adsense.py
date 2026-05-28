#!/usr/bin/env python3
import os, re

SITE = r'/mnt/g/OpenClawData/.openclaw/workspace/infinity-nikki-guide'
CONTACT = "1450378286@qq.com"

# --- 1. Create about.html ---
about = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>关于我们 - 无限暖暖攻略站</title>
    <meta name="description" content="无限暖暖攻略站 - 关于我们。最全的中文攻略站，提供奇想星、灵感露珠、服装图鉴、兑换码等攻略内容。">
    <link rel="stylesheet" href="style.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8350493966733244" crossorigin="anonymous"></script>
</head>
<body>
    <header class="site-header">
        <div class="container">
            <div class="logo">
                <h1>✨ 无限暖暖攻略站</h1>
            </div>
            <nav class="main-nav">
                <button class="mobile-menu-btn" id="menuToggle">☰</button>
                <ul id="navMenu">
                    <li><a href="index.html">首页</a></li>
                    <li><a href="whimstars.html">奇想星</a></li>
                    <li><a href="dewdrops.html">灵感露珠</a></li>
                    <li><a href="materials.html">材料</a></li>
                    <li><a href="outfits.html">服装</a></li>
                    <li><a href="codes.html">兑换码</a></li>
                    <li><a href="beginner.html">新手攻略</a></li>
                    <li><a href="about.html" class="active">关于</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <section class="page-hero">
            <div class="container">
                <h1>关于我们</h1>
                <p class="page-description">了解无限暖暖攻略站</p>
            </div>
        </section>
        <section class="content-area" style="padding:40px 0;">
            <div class="container" style="max-width:700px;margin:0 auto;padding:0 20px;">
                <div class="guide-article">
                    <h2>目标</h2>
                    <p>无限暖暖攻略站是 Infinity Nikki 游戏的第三方中文攻略站，致力于为中文玩家提供最全面、最及时的攻略内容。从奇想星位置、灵感露珠收集、服装图鉴到最新兑换码，我们持续更新，帮助玩家更好地享受游戏。</p>
                </div>
                <div class="guide-article">
                    <h2>网站内容</h2>
                    <ul>
                        <li>奇想星全地图收集指南</li>
                        <li>灵感露珠全收集路线优化</li>
                        <li>全服装图鉴与获取方式</li>
                        <li>兑换码实时更新</li>
                        <li>新手入门完整攻略</li>
                        <li>材料获取全指南</li>
                        <li>版本更新攻略</li>
                    </ul>
                </div>
                <div class="guide-article">
                    <h2>更新频率</h2>
                    <p>我们每日更新兑换码信息，每周更新攻略内容，版本更新时第一时间发布相关攻略。</p>
                </div>
                <div class="guide-article">
                    <h2>联系我们</h2>
                    <p>如有任何建议、问题或合作意向，欢迎通过以下方式联系我们：</p>
                    <ul>
                        <li>邮箱：<a href="mailto:''' + CONTACT + '''">''' + CONTACT + '''</a></li>
                    </ul>
                </div>
                <div class="guide-article">
                    <h2>免责声明</h2>
                    <p>本站为玩家自建的第三方攻略站，与 Infold Games / Papergames 无关。所有游戏内容版权归原开发商所有。攻略内容仅供参考，如有错误欢迎指正。</p>
                </div>
            </div>
        </section>
    </main>
    <footer class="site-footer">
        <div class="container">
            <p>© 2025-2026 无限暖暖攻略站 | Infinity Nikki Fan Site</p>
            <p class="footer-note"><a href="privacy.html">隐私政策</a> | <a href="about.html">关于我们</a></p>
        </div>
    </footer>
    <script>
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('navMenu')?.classList.toggle('open');
    });
    </script>
</body>
</html>'''

with open(os.path.join(SITE, "about.html"), "w", encoding="utf-8") as f:
    f.write(about)
print("Created about.html")

# --- 2. Process all HTML files ---
nav_insert = '''                    <li><a href="about.html">关于</a></li>'''

for fn in os.listdir(SITE):
    if not fn.endswith(".html"):
        continue
    fp = os.path.join(SITE, fn)
    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()
    orig = c
    notes = []

    # Remove Baidu analytics placeholder block
    # Find lines containing TODO_REPLACE_WITH_YOUR_BAIDU_ID and the surrounding script block
    lines = c.split("\n")
    new_lines = []
    skip = False
    for ln in lines:
        if "网站统计" in ln or "var _hmt" in ln:
            skip = True
        if not skip:
            new_lines.append(ln)
        if skip and "</script>" in ln:
            skip = False
            continue
        if skip:
            continue
    c = "\n".join(new_lines)
    if c != orig:
        notes.append("removed baidu analytics")

    # Remove Google Analytics placeholder block
    lines = c.split("\n")
    new_lines = []
    skip = False
    for ln in lines:
        if "G-TODO_REPLACE" in ln or ("function gtag" in ln and "TODO" in c):
            skip = True
        if not skip:
            new_lines.append(ln)
        if skip and "</script>" in ln:
            skip = False
            continue
        if skip:
            continue
    # Clean up empty lines from removal
    c = "\n".join(new_lines)
    # Re-clean empty lines
    while "\n\n\n" in c:
        c = c.replace("\n\n\n", "\n\n")
    if c != orig and "removed" not in notes:
        notes.append("removed GA placeholder")

    orig2 = c

    # Add nav link for "about" if not already present
    if 'href="about.html"' not in c:
        # Find the beginner.html nav item and insert after it
        c = c.replace('<li><a href="beginner.html">新手攻略</a></li>',
                      '<li><a href="beginner.html">新手攻略</a></li>\n' + nav_insert)
        if c != orig2:
            notes.append("added about nav")

    # Add footer about link
    if '关于我们' not in c and '<a href="privacy.html">隐私政策</a>' in c and 'about.html' not in c:
        c = c.replace('<a href="privacy.html">隐私政策</a>',
                      '<a href="privacy.html">隐私政策</a> | <a href="about.html">关于我们</a>')
        if c != orig2 or 'added about nav' not in notes:
            notes.append("added about footer")

    # Update privacy page
    if fn == "privacy.html":
        if "GitHub Issues" in c:
            c = c.replace("请通过 GitHub Issues 联系我们", "请通过邮箱联系我们")
            notes.append("updated contact")
        if CONTACT not in c:
            c = c.replace('请通过邮箱联系我们。</p>',
                          '请通过邮箱联系我们。</p>\n                <p>邮箱：<a href="mailto:' + CONTACT + '">' + CONTACT + '</a></p>')
            notes.append("added email")
        if "最后更新：2025年" in c:
            c = c.replace("最后更新：2025年5月8日", "最后更新：2026年5月26日")
            notes.append("updated date")
        if '© 2025 无限暖暖攻略站' in c:
            c = c.replace('<p>© 2025 无限暖暖攻略站</p>',
                          '<p>© 2025-2026 无限暖暖攻略站 | Infinity Nikki Fan Site</p>')
            notes.append("updated footer")

    # Remove empty <script></script> lines (from removed GA)
    c = re.sub(r'<script>\s*</script>\s*', '', c)

    if c != orig:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(c)
    print(f"{'OK' if c != orig else 'SKIP'} {fn}: {', '.join(notes) if notes else 'no changes'}")

# --- 3. Update sitemap ---
smap = os.path.join(SITE, "sitemap.xml")
with open(smap, "r", encoding="utf-8") as f:
    s = f.read()
if "about.html" not in s:
    newurl = '''  <url>
    <loc>https://nikki-guide.cn/about.html</loc>
    <lastmod>2026-05-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
'''
    s = s.replace("</urlset>", newurl + "</urlset>")
    with open(smap, "w", encoding="utf-8") as f:
        f.write(s)
    print("Updated sitemap.xml")
else:
    print("sitemap.xml already has about.html")

print("\nAll done!")