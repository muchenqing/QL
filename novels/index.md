# 小说阅读

欢迎来到小说阅读页面，这里提供了一些本地小说供您阅读。

## 小说列表

<div id="novel-list" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px;"></div>

## 阅读区域

<div id="reading-area" style="display: none; margin: 20px auto; max-width: 800px; padding: 20px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
    <h2 id="novel-title"></h2>
    <button id="back-btn" style="padding: 8px 16px; background-color: rgba(255, 255, 255, 0.9); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 5px; cursor: pointer; transition: all 0.3s ease;">返回列表</button>
  </div>
  <div style="margin-bottom: 20px;">
    <label for="chapter-select" style="margin-right: 10px;">选择章节：</label>
    <select id="chapter-select" style="padding: 8px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 5px;"></select>
  </div>
  <div id="novel-content" style="line-height: 1.8; font-size: 16px; color: #333; white-space: pre-wrap;"></div>
</div>

<script>
// 小说数据（模拟数据，实际可以从文件或API获取）
const novels = [
  {
    id: 1,
    title: '小说示例1',
    author: '作者A',
    cover: 'https://via.placeholder.com/200x300?text=小说1封面',
    chapters: [
      { id: 1, title: '第一章 开始', content: '这是第一章的内容。\n\n故事从这里开始...\n\n阳光透过窗户洒在书桌上，照亮了那本古老的日记...' },
      { id: 2, title: '第二章 发展', content: '这是第二章的内容。\n\n随着故事的发展，主角遇到了新的挑战...\n\n在一个风雨交加的夜晚，门铃突然响了...' },
      { id: 3, title: '第三章 高潮', content: '这是第三章的内容。\n\n故事进入了高潮部分...\n\n真相终于大白，原来一切都是一场误会...' }
    ]
  },
  {
    id: 2,
    title: '小说示例2',
    author: '作者B',
    cover: 'https://via.placeholder.com/200x300?text=小说2封面',
    chapters: [
      { id: 1, title: '第一章 序章', content: '这是小说示例2的序章。\n\n在遥远的未来，人类已经殖民了整个太阳系...\n\n主角是一名年轻的宇航员，他即将踏上一段充满未知的旅程...' },
      { id: 2, title: '第二章 出发', content: '这是第二章的内容。\n\n飞船缓缓驶离地球轨道，向着火星进发...\n\n船员们都沉浸在对未来的期待中...' },
      { id: 3, title: '第三章 意外', content: '这是第三章的内容。\n\n就在飞船即将到达火星时，意外发生了...\n\n警报声突然响起，屏幕上显示着不明物体正在接近...' }
    ]
  }
];

// DOM元素
const novelList = document.getElementById('novel-list');
const readingArea = document.getElementById('reading-area');
const novelTitle = document.getElementById('novel-title');
const backBtn = document.getElementById('back-btn');
const chapterSelect = document.getElementById('chapter-select');
const novelContent = document.getElementById('novel-content');

// 初始化小说列表
function initNovelList() {
  novels.forEach(novel => {
    const novelCard = document.createElement('div');
    novelCard.style.cssText = `
      width: 200px;
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      transition: transform 0.3s ease;
      cursor: pointer;
    `;
    
    novelCard.addEventListener('mouseenter', () => {
      novelCard.style.transform = 'translateY(-5px)';
    });
    
    novelCard.addEventListener('mouseleave', () => {
      novelCard.style.transform = 'translateY(0)';
    });
    
    novelCard.innerHTML = `
      <img src="${novel.cover}" alt="${novel.title}" style="width: 100%; height: 300px; object-fit: cover;">
      <div style="padding: 15px;">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #333;">${novel.title}</h3>
        <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">作者：${novel.author}</p>
        <p style="margin: 0 0 15px 0; font-size: 14px; color: #666;">章节数：${novel.chapters.length}</p>
        <button class="read-btn" data-novel-id="${novel.id}" style="width: 100%; padding: 10px; background-color: rgba(255, 255, 255, 0.9); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 5px; cursor: pointer; transition: all 0.3s ease;">开始阅读</button>
      </div>
    `;
    
    novelList.appendChild(novelCard);
  });
  
  // 添加阅读按钮事件监听
  document.querySelectorAll('.read-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const novelId = parseInt(e.target.dataset.novelId);
      openNovel(novelId);
    });
  });
}

// 打开小说
function openNovel(novelId) {
  const novel = novels.find(n => n.id === novelId);
  if (!novel) return;
  
  // 设置小说标题
  novelTitle.textContent = novel.title;
  
  // 填充章节列表
  chapterSelect.innerHTML = '';
  novel.chapters.forEach(chapter => {
    const option = document.createElement('option');
    option.value = chapter.id;
    option.textContent = chapter.title;
    chapterSelect.appendChild(option);
  });
  
  // 显示第一章内容
  showChapter(novelId, novel.chapters[0].id);
  
  // 显示阅读区域，隐藏小说列表
  readingArea.style.display = 'block';
  novelList.style.display = 'none';
}

// 显示章节内容
function showChapter(novelId, chapterId) {
  const novel = novels.find(n => n.id === novelId);
  if (!novel) return;
  
  const chapter = novel.chapters.find(c => c.id === chapterId);
  if (!chapter) return;
  
  novelContent.textContent = chapter.content;
}

// 返回列表
backBtn.addEventListener('click', () => {
  readingArea.style.display = 'none';
  novelList.style.display = 'flex';
});

// 章节选择事件
chapterSelect.addEventListener('change', (e) => {
  const novelId = parseInt(novelTitle.textContent.match(/\d+/)[0]);
  const chapterId = parseInt(e.target.value);
  showChapter(novelId, chapterId);
});

// 初始化页面
initNovelList();
</script>
