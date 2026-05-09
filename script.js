// ===== Mobile Menu =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    }

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

    for (const [area, items] of Object.entries(whimstarsData)) {
        const container = containers[area];
        if (!container) continue;
        container.innerHTML = items.map(item => {
            const checked = localStorage.getItem('whimstar_' + item.id) === 'collected';
            return '<div class="item-card ' + (checked ? 'collected' : '') + '" data-id="' + item.id + '" onclick="toggleWhimstar(\'' + item.id + '\')">'
                + '<div class="item-name">' + (checked ? '✅ ' : '⭐ ') + item.name + '</div>'
                + '<div class="item-location">' + item.location + '</div></div>';
        }).join('');
    }

    updateProgress();
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
    if (collected) localStorage.removeItem(key);
    else localStorage.setItem(key, 'collected');
    const card = document.querySelector('.item-card[data-id="' + id + '"]');
    if (card) {
        card.classList.toggle('collected');
        const nameEl = card.querySelector('.item-name');
        const allItems = [...whimstarsData.wishfield, ...whimstarsData.floral, ...whimstarsData.breezy];
        const item = allItems.find(i => i.id === id);
        if (item) nameEl.textContent = (card.classList.contains('collected') ? '✅ ' : '⭐ ') + item.name;
    }
    updateProgress();
}

function updateProgress() {
    let total = 0, collected = 0;
    for (const items of Object.values(whimstarsData)) {
        for (const item of items) { total++;
            if (localStorage.getItem('whimstar_' + item.id) === 'collected') collected++; }
    }
    const pct = total > 0 ? Math.round(collected / total * 100) : 0;
    const pctEl = document.getElementById('progressPct');
    const fillEl = document.getElementById('progressFill');
    if (pctEl) pctEl.textContent = pct + '% (' + collected + '/' + total + ')';
    if (fillEl) fillEl.style.width = pct + '%';
}

// ===== Outfits Data (Expanded) =====
const outfitsData = [
    { name: '花间漫步', type: '限时', source: '限时共鸣池', tags: ['优雅', '清新'], rarity: 5, desc: '以春日花海为灵感设计的优雅套装', slots: ['发型', '连衣裙', '鞋子', '头饰', '耳饰', '项链', '手套', '袜子'] },
    { name: '星光舞会', type: '限时', source: '限时共鸣池', tags: ['华丽', '成熟'], rarity: 5, desc: '夜幕下的璀璨星光，舞会焦点', slots: ['发型', '连衣裙', '鞋子', '头饰', '项链', '耳饰', '手套', '提包'] },
    { name: '冬日暖阳', type: '限时', source: '限时共鸣池', tags: ['温暖', '优雅'], rarity: 5, desc: '冬日暖阳下的温柔穿搭', slots: ['发型', '上衣', '下装', '外套', '鞋子', '头饰', '耳饰', '手套'] },
    { name: '东方雅韵', type: '限时', source: '限时共鸣池', tags: ['优雅', '古典'], rarity: 5, desc: '融合东方美学的典雅套装', slots: ['发型', '连衣裙', '鞋子', '头饰', '扇子', '项链', '耳饰'] },
    { name: '海洋之歌', type: '限时', source: '限时共鸣池', tags: ['优雅', '华丽'], rarity: 5, desc: '人鱼传说灵感，海洋的韵律', slots: ['发型', '连衣裙', '鞋子', '头饰', '项链', '耳饰', '手套', '提包'] },
    { name: '森林轻语', type: '常驻', source: '常驻共鸣池', tags: ['自然', '清新'], rarity: 4, desc: '与自然和谐共处的森林精灵风格', slots: ['发型', '连衣裙', '鞋子', '头饰', '项链', '耳饰'] },
    { name: '童话梦境', type: '常驻', source: '常驻共鸣池', tags: ['可爱', '华丽'], rarity: 4, desc: '童话书里走出来的梦幻套装', slots: ['发型', '连衣裙', '鞋子', '头饰', '项链', '耳饰', '手套'] },
    { name: '青春校园', type: '常驻', source: '常驻共鸣池', tags: ['活泼', '清新'], rarity: 4, desc: '重返校园的青春活力穿搭', slots: ['发型', '上衣', '下装', '鞋子', '袜子', '头饰', '提包'] },
    { name: '梦幻派对', type: '常驻', source: '常驻共鸣池', tags: ['华丽', '可爱'], rarity: 4, desc: '派对主角的闪亮登场', slots: ['发型', '连衣裙', '鞋子', '头饰', '项链', '耳饰', '手套'] },
    { name: '午后红茶', type: '常驻', source: '常驻共鸣池', tags: ['优雅', '可爱'], rarity: 4, desc: '英式下午茶风的精致穿搭', slots: ['发型', '连衣裙', '鞋子', '头饰', '手套', '提包'] },
    { name: '天空旅行者', type: '常驻', source: '常驻共鸣池', tags: ['清新', '活泼'], rarity: 4, desc: '飞行主题的轻便出行装', slots: ['发型', '上衣', '下装', '外套', '鞋子', '头饰', '提包'] },
    { name: '糖果甜心', type: '常驻', source: '常驻共鸣池', tags: ['可爱', '甜美'], rarity: 3, desc: '糖果色系的甜蜜穿搭', slots: ['发型', '连衣裙', '鞋子', '头饰', '袜子'] },
    { name: '甜蜜时光', type: '制作', source: '设计图制作', tags: ['可爱', '甜美'], rarity: 4, desc: '充满少女心的甜点主题套装', slots: ['发型', '连衣裙', '鞋子', '头饰', '耳饰', '手套', '提包'] },
    { name: '骑士精神', type: '制作', source: '设计图制作', tags: ['帅气', '成熟'], rarity: 4, desc: '英姿飒爽的骑士风格套装', slots: ['发型', '上衣', '下装', '外套', '鞋子', '手套', '头饰'] },
    { name: '夜色玫瑰', type: '制作', source: '设计图制作', tags: ['华丽', '成熟'], rarity: 4, desc: '暗夜玫瑰般的神秘优雅套装', slots: ['发型', '连衣裙', '鞋子', '头饰', '项链', '耳饰', '手套'] },
    { name: '星光游乐园', type: '制作', source: '设计图制作', tags: ['可爱', '华丽'], rarity: 4, desc: '游乐园夜晚的梦幻穿搭', slots: ['发型', '连衣裙', '鞋子', '头饰', '项链', '耳饰', '提包'] },
    { name: '探险家', type: '制作', source: '设计图制作', tags: ['帅气', '活泼'], rarity: 3, desc: '适合冒险旅途的实用穿搭', slots: ['发型', '上衣', '下装', '鞋子', '帽子', '提包'] },
    { name: '夏日海滩', type: '制作', source: '设计图制作', tags: ['活泼', '清新'], rarity: 3, desc: '清爽夏日的度假风穿搭', slots: ['发型', '上衣', '下装', '鞋子', '头饰', '墨镜'] },
    { name: '学园祭', type: '制作', source: '设计图制作', tags: ['可爱', '活泼'], rarity: 3, desc: '校园祭主题的活力穿搭', slots: ['发型', '上衣', '下装', '鞋子', '头饰', '提包'] },
    { name: '丰收季节', type: '制作', source: '设计图制作', tags: ['自然', '温暖'], rarity: 3, desc: '秋季丰收主题的温暖穿搭', slots: ['发型', '连衣裙', '鞋子', '头饰', '围巾', '手套'] },
    { name: '简约日常', type: '制作', source: '设计图制作', tags: ['清新', '活泼'], rarity: 2, desc: '日常出行的基础穿搭，新手首选', slots: ['发型', '上衣', '下装', '鞋子'] },
    { name: '温暖编织', type: '制作', source: '设计图制作', tags: ['温暖', '可爱'], rarity: 2, desc: '手工编织风的温暖套装', slots: ['发型', '连衣裙', '鞋子', '围巾', '手套'] },
];

// ===== Collection Tracking =====
function getCollectedOutfits() {
    const c = localStorage.getItem('outfits_collected');
    return c ? JSON.parse(c) : [];
}
function saveCollectedOutfits(c) { localStorage.setItem('outfits_collected', JSON.stringify(c)); }

function toggleOutfitCollect(name) {
    let collected = getCollectedOutfits();
    const idx = collected.indexOf(name);
    if (idx >= 0) collected.splice(idx, 1);
    else collected.push(name);
    saveCollectedOutfits(collected);
    renderOutfits(document.querySelector('.filter-btn.active')?.dataset?.type || 'all');
}

// ===== Outfits Page =====
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
    if (!grid) return;
    const filtered = type === 'all' ? outfitsData : outfitsData.filter(o => o.type === type);
    const collected = getCollectedOutfits();
    const total = outfitsData.length;
    const pct = total > 0 ? Math.round(collected.length / total * 100) : 0;

    let html = '<div class="outfit-progress" style="grid-column:1/-1;text-align:center;padding:12px;background:var(--card-bg,#f8f9fa);border-radius:8px;margin-bottom:8px">';
    html += '📊 收集进度：' + pct + '%（' + collected.length + '/' + total + '套）';
    html += '<div style="height:6px;background:#eee;border-radius:3px;margin-top:6px;overflow:hidden">';
    html += '<div style="height:100%;background:linear-gradient(90deg,#e84393,#fd79a8);border-radius:3px;width:' + pct + '%;transition:width .3s"></div></div></div>';

    html += filtered.map(o => {
        const isCollected = collected.includes(o.name);
        return '<div class="outfit-card">'
            + '<div class="outfit-header"><div class="outfit-name">' + o.name + '</div>'
            + '<span class="outfit-type">' + o.type + '</span></div>'
            + '<div class="outfit-body"><p>' + o.desc + '</p>'
            + '<p style="margin-top:8px;font-size:0.85em;color:#888">获取方式：' + o.source + '<br>部位：' + o.slots.join('、') + '</p></div>'
            + '<div class="outfit-tags">' + o.tags.map(t => '<span>#' + t + '</span>').join('') + '</div>'
            + '<div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">'
            + '<span style="font-size:0.85em;color:#888">' + '★'.repeat(o.rarity) + '☆'.repeat(5 - o.rarity) + '</span>'
            + '<button onclick="toggleOutfitCollect(\'' + o.name + '\')" style="background:none;border:1px solid #ddd;border-radius:4px;padding:2px 10px;cursor:pointer;font-size:0.85em">'
            + (isCollected ? '✅ 已收集' : '➕ 标记收集') + '</button></div></div>';
    }).join('');

    grid.innerHTML = html;
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
    container.innerHTML = challengesData.map(c =>
        '<div class="challenge-item"><h3>🎯 ' + c.name + '</h3>'
        + '<div class="challenge-detail"><strong>核心属性：</strong>' + c.attribute + '<br>'
        + '<strong>推荐穿搭：</strong>' + c.suggestion + '</div>'
        + '<div class="challenge-tip">💡 ' + c.tip + '</div></div>'
    ).join('');
}

// ===== Search =====
function initSearch() {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    if (!input || !btn) return;
    function doSearch() {
        const q = input.value.trim().toLowerCase();
        if (!q) return;
        const pages = [
            { name: '奇想星位置', url: 'whimstars.html', keywords: ['奇想星', 'whimstar', '收集', '坐标'] },
            { name: '服装图鉴', url: 'outfits.html', keywords: ['服装', '套装', 'outfit', '图鉴', '穿搭'] },
            { name: '穿搭挑战', url: 'challenges.html', keywords: ['挑战', '穿搭', '评分', '关卡'] },
        ];
        const match = pages.find(p => p.keywords.some(k => q.includes(k)));
        window.location.href = match ? match.url : 'whimstars.html';
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
