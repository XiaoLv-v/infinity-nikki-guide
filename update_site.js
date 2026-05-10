const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || '.';

function updateIndex() {
  const filePath = path.join(dir, 'index.html');
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const oldItem = `                    <article class="guide-item">
                        <span class="guide-date">2026-05-09</span>
                        <h3><a href="codes.html">兑换码已更新 — 3个新码有效</a></h3>
                        <p>新增「与百万星光作伴共赴未来」「大喵者暖暖伙伴也」「塞进暖暖行李箱的小惊喜」</p>
                    </article>`;
  
  const newItem = `                    <article class="guide-item">
                        <span class="guide-date">2026-05-10</span>
                        <h3><a href="whimstars.html">2.5下半版本预告 — 5月11日更新</a></h3>
                        <p>2.5版本下半段将于5月11日上线，全新双四星套装、限时隐藏彩蛋！1000钻石+30启示水晶记得拿</p>
                    </article>
                    <article class="guide-item">
                        <span class="guide-date">2026-05-09</span>
                        <h3><a href="codes.html">兑换码已更新 — 3个新码有效</a></h3>
                        <p>新增「与百万星光作伴共赴未来」「大喵者暖暖伙伴也」「塞进暖暖行李箱的小惊喜」</p>
                    </article>`;
  
  if (content.includes(oldItem)) {
    content = content.replace(oldItem, newItem);
    console.log('index.html: OK - replaced guide item');
  } else {
    console.log('index.html: ERROR - old text not found');
    const idx = content.indexOf('guide-list');
    if (idx >= 0) {
      console.log(`  guide-list at ${idx}`);
      console.log(content.slice(idx, idx + 800));
    }
    return false;
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

function updateCodes() {
  const filePath = path.join(dir, 'codes.html');
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const oldText = `🆕 当前更新于 2026-05-09 · 新增3个有效兑换码`;
  const newText = `🆕 维护于 2026-05-10 · 3个有效兑换码`;
  
  if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    console.log('codes.html: OK - replaced date');
  } else {
    // Try to find the line
    const idx = content.indexOf('当前更新');
    if (idx >= 0) {
      console.log(`  Found at ${idx}: ${JSON.stringify(content.slice(idx, idx + 60))}`);
    } else {
      console.log('codes.html: ERROR - date text not found at all');
    }
    return false;
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

let ok = true;
if (!updateIndex()) ok = false;
if (!updateCodes()) ok = false;
process.exit(ok ? 0 : 1);
