#!/usr/bin/env python3
"""
AdSense 优化脚本 - 批量修改无限暖暖攻略站
1. 创建 about.html
2. 移除所有占位符统计代码 (TODO_REPLACE)
3. 在所有页面导航栏添加"关于我们"
4. 更新页脚链接
5. 更新隐私政策的联系方式
6. 丰富挑战页面内容
"""

import os
import re

SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CONTACT_EMAIL = "1450378286@qq.com"

# ===== 1. 创建 about.html =====
about_html = """<!DOCTYPE html>
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
                    <h2>🎯 我们的目标</h2>
                    <p>无限暖暖攻略站是 Infinity Nikki 游戏的第三方中文攻略站，致力于为中文玩家提供最全面、最及时的攻略内容。从奇想星位置、灵感露珠收集、服装图鉴到最新兑换码，我们持续更新，帮助玩家更好地享受游戏。</p>
                </div>

                <div class="guide-article">
                    <h2>📋 网站内容</h2>
                    <ul>
                        <li>⭐ 奇想星全地图收集指南</li>
                        <li>💧 灵感露珠全收集路线优化</li>
                        <li>👗 全服装图鉴与获取方式</li>
                        <li>🎁 兑换码实时更新</li>
                        <li>📚 新手入门完整攻略</li>
                        <li>📦 材料获取全指南</li>
                        <li>🎯 版本更新攻略</li>
                    </ul>
                </div>

                <div class="guide-article">
                    <h2>📅 更新频率</h2>
                    <p>我们每日更新兑换码信息，每周更新攻略内容，版本更新时第一时间发布相关攻略。</p>
                </div>

                <div class="guide-article">
                    <h2>📞 联系我们</h2>
                    <p>如有任何建议、问题或合作意向，欢迎通过以下方式联系我们：</p>
                    <ul>
                        <li>📧 邮箱：<a href="mailto:""" + CONTACT_EMAIL + """ rel="nofollow">""" + CONTACT_EMAIL + """</a></li>
                    </ul>
                </div>

                <div class="guide-article">
                    <h2>⚠️ 免责声明</h2>
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
</html>"""

with open(os.path.join(SITE_DIR, "about.html"), "w", encoding="utf-8") as f:
    f.write(about_html)
print("✅ 已创建 about.html")

# ===== 2-4. 批量修改所有 HTML 文件 =====
html_files = [f for f in os.listdir(SITE_DIR) if f.endswith(".html")]
print(f"\n📁 共 {len(html_files)} 个 HTML 文件")

for filename in html_files:
    filepath = os.path.join(SITE_DIR, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    changes = []
    original = content

    # --- a) 移除百度统计占位符 ---
    # Pattern 1: 完整百度统计块
    baidu_pattern = r'<!-- 网站统计 -->\s*<script>\s*var _hmt = _hmt \|\| \[\];\s*\(function\(\) \{\s*var hm = document\.createElement\('script'\);\s*hm\.src = 'https://hm\.baidu\.com/hm\.js\?TODO_REPLACE_WITH_YOUR_BAIDU_ID';\s*var s = document\.getElementsByTagName\('script'\)\[0\];\s*s\.parentNode\.insertBefore\(hm, s\);\s*\}\)\(\);\s*</script>'
    if re.search(baidu_pattern, content):
        content = re.sub(baidu_pattern, '', content)
        changes.append("移除百度统计占位符")

    # --- b) 移除 Google Analytics 占位符 ---
    ga_pattern = r'<!-- Google tag \(gtag\.js\) -->\s*<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-TODO_REPLACE">\s*</script>\s*<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\)\{dataLayer\.push\(arguments\);\}\s*gtag\('js', new Date\(\)\);\s*gtag\('config', 'G-TODO_REPLACE'\);\s*</script>'
    if re.search(ga_pattern, content):
        content = re.sub(ga_pattern, '', content)
        changes.append("移除 Google Analytics 占位符")

    # --- c) 导航栏添加"关于我们" ---
    # 在所有页面的导航中，在"新手攻略"后面添加"关于"
    # 需要检测是否已有"关于"链接
    if 'href="about.html"' not in content:
        # 找到最后一条导航项（新手攻略那行）后面插入
        nav_insert = re.search(r'(<li><a href="beginner\.html"[^>]*>[^<]*</a></li>)', content)
        if nav_insert:
            insert_pos = nav_insert.end()
            before = content[:insert_pos]
            after = content[insert_pos:]
            # Check if active class needed
            active_class = ' active' if filename == 'about.html' else ''
            about_link = f'\n                    <li><a href="about.html"{active_class}>关于</a></li>'
            content = before + about_link + after
            changes.append("导航栏添加「关于」链接")

    # --- d) 页脚添加关于链接 ---
    # 找到隐私政策链接，在后面添加" | 关于我们"
    # 但有些文件用 <a href="privacy.html">隐私政策</a>，有些是 <a href="privacy.html">隐私政策</a> + 其他内容
    # 先检查是否已有"关于我们"在footer
    if '关于我们' not in content:
        # 找隐私政策链接段落后加 | 关于我们
        # 统一的模式：<a href="privacy.html">隐私政策</a> 后面可能跟 </p> 或 | 其他
        footer_pattern = r'(<a href="privacy\.html">隐私政策</a>)'
        if re.search(footer_pattern, content):
            # 加在后面，但如果已经有 | 则跳过
            if '关于我们' not in content[content.index('privacy'):]:
                content = re.sub(
                    footer_pattern,
                    r'\1 | <a href="about.html">关于我们</a>',
                    content
                )
                changes.append("页脚添加关于链接")

    # --- e) 更新隐私政策联系方式 ---
    if filename == "privacy.html":
        # 更新"GitHub Issues"为邮箱
        content = content.replace(
            "请通过 GitHub Issues 联系我们",
            "请通过邮箱联系我们"
        )
        # 在"如有任何隐私相关问题"段落中添加邮箱
        email_link = f'<br>邮箱：<a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>'
        if '<br>邮箱' not in content:
            content = content.replace(
                '请通过邮箱联系我们。</p>',
                f'请通过邮箱联系我们。</p>\n                <p>{email_link}</p>'
            )
        changes.append("更新隐私政策联系方式")

        # 更新最后更新日期
        content = content.replace("最后更新：2025年5月8日", "最后更新：2026年5月26日")
        changes.append("更新隐私政策日期")

    # --- f) 更新页脚年份（隐私政策） ---
    if filename == "privacy.html":
        content = content.replace(
            '<p>© 2025 无限暖暖攻略站</p>',
            '<p>© 2025-2026 无限暖暖攻略站 | Infinity Nikki Fan Site</p>'
        )
        changes.append("更新页脚年份")

    # 如果有变更则写入
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✅ {filename}: {'; '.join(changes)}")
    else:
        print(f"⏭️ {filename}: 无需修改")

# ===== 5. 更新 sitemap.xml =====
sitemap_path = os.path.join(SITE_DIR, "sitemap.xml")
with open(sitemap_path, "r", encoding="utf-8") as f:
    sitemap = f.read()

# 在 </urlset> 前加入 about.html
about_url = """  <url>
    <loc>https://nikki-guide.cn/about.html</loc>
    <lastmod>2026-05-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
"""
if "about.html" not in sitemap:
    sitemap = sitemap.replace("</urlset>", about_url + "</urlset>")
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap)
    print("\n✅ sitemap.xml 已更新")
else:
    print("\n⏭️ sitemap.xml: 已有 about.html")

print("\n🎉 所有优化完成！")