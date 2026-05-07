// ===== Mobile Menu =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    }

    // ===== Collectible Checklist (Whimstars Page) =====
    initWhimstarsChecklist();
    initOutfitsPage();
    initChallengesPage();
    initSearch();
    initNewsletter();
});

// ===== Whimstars Data =====
const whimstarsData = {
    wishfield: [
        { id: 'w1', name: '奇想星 #1', location: '愿望之乡·中央广场', area: 'wishfield' },
        { id: 'w2', name: '奇想星 #2', location: '愿望之乡·北侧花丛', area: 'wishfield' },
        { id: 'w3', name: '奇想星 #3', location: '愿望之乡·喷泉后方', area: 'wishfield' },
        { id: 'w4', name: '奇想星 #4', location: '愿望之乡·东侧小径', area: 'wishfield' },
        { id: 'w5', name: '奇想星 #5', location: '愿望之乡·钟楼顶部', area: 'wishfield' },
        { id: 'w6', name: '奇想星 #6', location: '愿望之乡·南侧花园', area: 'wishfield' },
        { id: 'w7', name: '奇想星 #7', location: '愿望之乡·西侧桥头', area: 'wishfield' },
        { id: 'w8', name: '奇想星 #8', location: '愿望之乡·教堂内', area: 'wishfield' },
        { id: 'w9', name: '奇想星 #9', location: '愿望之乡·瞭望台', area: 'wishfield' },
        { id: 'w10', name: '奇想星 #10', location: '愿望之乡·地洞入口', area: 'wishfield' },
    ],
    floral: [
        { id: 'f1', name: '奇想星 #11', location: '花愿镇·入口花架', area: 'floral' },
        { id: 'f2', name: '奇想星 #12', location: '花愿镇·集市角落', area: 'floral' },
        { id: 'f3', name: '奇想星 #13', location: '花愿镇·喷泉旁', area: 'floral' },
        { id: 'f4', name: '奇想星 #14', location: '花愿镇·后山花田', area: 'floral' },
        { id: 'f5', name: '奇想星 #15', location: '花愿镇·屋顶上', area: 'floral' },
        { id: 'f6', name: '奇想星 #16', location: '花愿镇·河岸边', area: 'floral' },
        { id: 'f7', name: '奇想星 #17', location: '花愿镇·风车旁', area: 'floral' },
        { id: 'f8', name: '奇想星 #18', location: '花愿镇·树洞内', area: 'floral' },
    ],
    breezy: [
        { id: 'b1', name: '奇想星 #19', location: '微风原野·入口', area: 'breezy' },
        { id: 'b2', name: '奇想星 #20', location: '微风原野·山坡', area: 'breezy' },
        { id: 'b3', name: '奇想星 #21', location: '微风原野·湖边', area: 'breezy' },
        { id: 'b4', name: '奇想星 #22', location: '微风原野·遗迹内', area: 'breezy' },
        { id: 'b5', name: '奇想星 #23', location: '微风原野·断桥下', area: 'breezy' },
        { id: 'b6', name: '奇想星 #24', location: '微风原野·大树上', area: 'breezy' },
        { id: 'b7', name: '奇想星 #25', location: '微风原野·瀑布后', area: 'breezy' },
    ]
};

function initWhimstarsChecklist() {
    const containers = {
        wishfield: document.getElementById('wishfieldItems'),
        floral: document.getElementById('floralItems'),
        breezy: document.getElementById('breezyItems')
    };

    if (!containers.wishfield) return;

    // Render items
    for (const [area, items] of Object.entries(whimstarsData)) {
        const container = containers[area];
        if (!container) continue;
        container.innerHTML = items.map(item => {
            const checked = localStorage.getItem('whimstar_' + item.id) === 'collected';
            return `
                <div class="item-card ${checked ? 'collected' : ''}" data-id="${item.id}" onclick="toggleWhimstar('${item.id}')">
                    <div class="item-name">${checked ? '✅ ' : '⭐ '}${item.name}</div>
                    <div class="item-location">${item.location}</div>
                </div>
            `;
        }).join('');
    }

    updateProgress();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const area = this.dataset.area;
            document.querySelectorAll('.zone-section').forEach(z => {
                z.style.display = (area === 'all' || z.dataset.area === area) ? 'block' : 'none';
            });
        });
    });
}

function toggleWhimstar(id) {
    const key = 'whimstar_' + id;
    const collected = localStorage.getItem(key) === 'collected';
    if (collected) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, 'collected');
    }

    // Update UI
    const card = document.querySelector(`.item-card[data-id="${id}"]`);
    if (card) {
        card.classList.toggle('collected');
        const nameEl = card.querySelector('.item-name');
        if (card.classList.contains('collected')) {
            nameEl.textContent = '✅ ' + (whimstarsData.wishfield.find(i => i.id === id)?.name || 
                whimstarsData.floral.find(i => i.id === id)?.name ||
                whimstarsData.breezy.find(i => i.id === id)?.name || '');
        } else {
            nameEl.textContent = '⭐ ' + (whimstarsData.wishfield.find(i => i.id === id)?.name || 
                whimstarsData.floral.find(i => i.id === id)?.name ||
                whimstarsData.breezy.find(i => i.id === id)?.name || '');
        }
    }
    updateProgress();
}

function updateProgress() {
    let total = 0, collected = 0;
    for (const items of Object.values(whimstarsData)) {
        for (const item of items) {
            total++;
            if (localStorage.getItem('whimstar_' + item.id) === 'collected') collected++;
        }
    }
    const pct = total > 0 ? Math.round(collected / total * 100) : 0;
    const pctEl = document.getElementById('progressPct');
    const fillEl = document.getElementById('progressFill');
    if (pctEl) pctEl.textContent = `${pct}% (${collected}/${total})`;
    if (fillEl) fillEl.style.width = pct + '%';
}

// ===== Outfits Page =====
const outfitsData = [
    { name: '花间漫步', type: '限时', source: '限时共鸣池', tags: ['优雅', '清新'], desc: '以春日花海为灵感设计的优雅套装' },
    { name: '星光舞会', type: '限时', source: '限时共鸣池', tags: ['华丽', '成熟'], desc: '夜幕下的璀璨星光，舞会焦点' },
    { name: '森林轻语', type: '常驻', source: '常驻共鸣池', tags: ['自然', '清新'], desc: '与自然和谐共处的森林精灵风格' },
    { name: '甜蜜时光', type: '制作', source: '设计图制作', tags: ['可爱', '甜美'], desc: '充满少女心的甜点主题套装' },
    { name: '海洋之歌', type: '制作', source: '设计图制作', tags: ['优雅', '华丽'], desc: '人鱼传说灵感，海洋的韵律' },
    { name: '童话梦境', type: '常驻', source: '常驻共鸣池', tags: ['可爱', '华丽'], desc: '童话书里走出来的梦幻套装' },
    { name: '冬日暖阳', type: '限时', source: '限时共鸣池', tags: ['温暖', '优雅'], desc: '冬日暖阳下的温柔穿搭' },
    { name: '骑士精神', type: '制作', source: '设计图制作', tags: ['帅气', '成熟'], desc: '英姿飒爽的骑士风格套装' },
    { name: '青春校园', type: '常驻', source: '常驻共鸣池', tags: ['活泼', '清新'], desc: '重返校园的青春活力穿搭' },
    { name: '东方雅韵', type: '限时', source: '限时共鸣池', tags: ['优雅', '古典'], desc: '融合东方美学的典雅套装' },
    { name: '探险家', type: '制作', source: '设计图制作', tags: ['帅气', '活泼'], desc: '适合冒险旅途的实用穿搭' },
    { name: '梦幻派对', type: '常驻', source: '常驻共鸣池', tags: ['华丽', '可爱'], desc: '派对主角的闪亮登场' },
];

function initOutfitsPage() {
    const grid = document.getElementById('outfitsGrid');
    if (!grid) return;
    renderOutfits('all');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderOutfits(this.dataset.type);
        });
    });
}

function renderOutfits(type) {
    const grid = document.getElementById('outfitsGrid');
    const filtered = type === 'all' ? outfitsData : outfitsData.filter(o => o.type === type);
    grid.innerHTML = filtered.map(o => `
        <div class="outfit-card">
            <div class="outfit-header">
                <div class="outfit-name">${o.name}</div>
                <span class="outfit-type">${o.type}</span>
            </div>
            <div class="outfit-body">
                <p>${o.desc}</p>
                <p style="margin-top:8px;font-size:0.85em;color:var(--text-dim)">获取方式：${o.source}</p>
            </div>
            <div class="outfit-tags">
                ${o.tags.map(t => `<span>#${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// ===== Challenges Page =====
const challengesData = [
    { name: '花愿镇·优雅穿搭', attribute: '优雅', suggestion: '花间漫步/星光舞会', tip: '使用优雅属性最高的服装，搭配同属性饰品可提升评分' },
    { name: '愿望之乡·清新一日', attribute: '清新', suggestion: '森林轻语/青春校园', tip: '清新属性优先，配件选择带"清新"标签的单品' },
    { name: '微风原野·活力挑战', attribute: '活泼', suggestion: '青春校园/探险家', tip: '活泼属性穿搭+运动鞋类有额外加分' },
    { name: '花愿镇·华丽晚宴', attribute: '华丽', suggestion: '星光舞会/童话梦境', tip: '华丽属性需达到阈值，建议携带至少3件华丽饰品' },
    { name: '愿望之乡·可爱风格', attribute: '可爱', suggestion: '甜蜜时光/童话梦境', tip: '可爱风格以裙装为上选，蝴蝶结类饰品加分' },
    { name: '城堡密道·成熟风', attribute: '成熟', suggestion: '骑士精神/星光舞会', tip: '成熟属性需要中长款穿搭，避免可爱元素' },
    { name: '秘境探索·全能挑战', attribute: '综合', suggestion: '星光舞会+配件', tip: '不要只堆一项属性，平衡搭配更易拿高分' },
    { name: '花海漫游·自然主题', attribute: '清新+自然', suggestion: '森林轻语/甜心时光', tip: '自然主题以绿色/棕色系为主色调' },
];

function initChallengesPage() {
    const container = document.getElementById('challengeList');
    if (!container) return;
    container.innerHTML = challengesData.map(c => `
        <div class="challenge-item">
            <h3>🎯 ${c.name}</h3>
            <div class="challenge-detail">
                <strong>核心属性：</strong>${c.attribute}<br>
                <strong>推荐穿搭：</strong>${c.suggestion}
            </div>
            <div class="challenge-tip">
                💡 ${c.tip}
            </div>
        </div>
    `).join('');
}

// ===== Search =====
function initSearch() {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    if (!input || !btn) return;

    function doSearch() {
        const q = input.value.trim().toLowerCase();
        if (!q) return;
        // Search page content and navigate
        const pages = [
            { name: '奇想星位置', url: 'whimstars.html', keywords: ['奇想星', 'whimstar', '收集', '坐标'] },
            { name: '服装图鉴', url: 'outfits.html', keywords: ['服装', '套装', 'outfit', '图鉴', '穿搭'] },
            { name: '穿搭挑战', url: 'challenges.html', keywords: ['挑战', '穿搭', '评分', '关卡'] },
        ];
        const match = pages.find(p => p.keywords.some(k => q.includes(k)));
        if (match) {
            window.location.href = match.url;
        } else {
            // Navigate to general search
            window.location.href = match?.url || 'whimstars.html';
        }
    }

    btn.addEventListener('click', doSearch);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') doSearch(); });
}

// ===== Newsletter =====
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('🎉 订阅成功！攻略更新将通过邮件发送给您。');
            this.querySelector('input[type="email"]').value = '';
        }
    });
}
