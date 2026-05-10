#!/usr/bin/env python3
"""Update the infinity nikki guide site"""
import sys

def update_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    old_item = '''                    <article class="guide-item">
                        <span class="guide-date">2026-05-09</span>
                        <h3><a href="codes.html">兑换码已更新 — 3个新码有效</a></h3>
                        <p>新增「与百万星光作伴共赴未来」「大喵者暖暖伙伴也」「塞进暖暖行李箱的小惊喜」</p>
                    </article>'''
    
    new_item = '''                    <article class="guide-item">
                        <span class="guide-date">2026-05-10</span>
                        <h3><a href="whimstars.html">2.5下半版本预告 — 5月11日更新</a></h3>
                        <p>2.5版本下半段将于5月11日上线，全新双四星套装、限时隐藏彩蛋！1000钻石+30启示水晶记得拿</p>
                    </article>
                    <article class="guide-item">
                        <span class="guide-date">2026-05-09</span>
                        <h3><a href="codes.html">兑换码已更新 — 3个新码有效</a></h3>
                        <p>新增「与百万星光作伴共赴未来」「大喵者暖暖伙伴也」「塞进暖暖行李箱的小惊喜」</p>
                    </article>'''
    
    if old_item in content:
        content = content.replace(old_item, new_item, 1)
        print('index.html: OK - replaced guide item')
    else:
        print('index.html: ERROR - old text not found')
        # Debug
        idx = content.find('guide-list')
        if idx >= 0:
            print(f'  guide-list at {idx}')
            print(repr(content[idx:idx+800]))
        return False
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    return True


def update_codes():
    with open('codes.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    old_text = '🆕 当前更新\u200e2026-05-09 \u00b7 新增3个有效兑换码'
    new_text = '🆕 当前更新\u200e2026-05-10 \u00b7 3个有效兑换码'
    
    if old_text in content:
        content = content.replace(old_text, new_text, 1)
        print('codes.html: OK - replaced date')
    else:
        print('codes.html: checking alternative...')
        # Try finding similar text
        idx = content.find('当前更新')
        if idx >= 0:
            print(f'  Found at {idx}: {repr(content[idx:idx+60])}')
        return False
    
    with open('codes.html', 'w', encoding='utf-8') as f:
        f.write(content)
    return True


if __name__ == '__main__':
    ok = True
    if not update_index():
        ok = False
    if not update_codes():
        ok = False
    sys.exit(0 if ok else 1)
