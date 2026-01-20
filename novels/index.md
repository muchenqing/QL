# 小说阅读

欢迎来到小说阅读页面，这里提供了一些本地小说供您阅读。

## 小说列表

<div id="novel-list" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px;"></div>

<!-- 小说内容，由构建脚本自动生成 -->
<pre class="novel-content" data-filename="和车模老妈的日常（无雷修改版2.0） 搜书吧 .txt" style="display: none;">
下载自搜书吧：www.soushu2023.com
备用地址：www.soushu2024.com
本书下载自搜书吧：www.soushu2022.com
备用地址：www.soushu2023.com

作者：闻啼鸟



第1章



「九筒。」

「碰!」

「嘿!蕾姐,我这听牌等自摸呢,你怎么总碰我上家啊?」

「怎么,还不让人碰啦? 二条！」

「让让让，哼！你等着,看我一会儿摸个大的！」

「摸大的？呵！床上摸你老公去吧！」

「哈哈哈哈哈哈！」

此番话惹得牌桌上的几个女人哈哈大笑，哪个不知菲菲的老公有个大家伙，那玩意的尺寸早就在菲菲和姐妹们的吹嘘中公开了。

「哼！蕾姐，我看你是嫉妒吧？」

菲菲噘着嘴道。

「是啊，嫉妒死我了，赶紧把你老公借给姐妹们用几天。」

「呦！那可不行，车和老公概不外借。怎么着蕾姐，跟你家内位……还没和好呐？」

「他过他的，我过我的，和什么好。幺鸡！」

王蕾面无表情，自然地摆弄着手中的牌。

菲菲一边抓牌一边道：「我看呐，要不就算了吧？现在哪个大老板在外面不养个小三儿啊？你睁只眼闭只眼的就得了，不管怎么说，俩人还是得一起过日子不是？二万！」

王蕾瞟了菲菲一眼道：「开什么玩笑！难道还让我装傻不成？南风！」

「能不能是误会啊？上回我看见你老公的宝马车是你儿子小朋开的，还送了内女孩进学校，你不会是错把小朋的女朋友当成老李的小三儿了吧？」

菲菲帮忙辩解道。
</pre>

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
// 小说数据，从页面中的特殊标签读取
const novels = [];

// DOM元素
const novelList = document.getElementById('novel-list');
const readingArea = document.getElementById('reading-area');
const novelTitle = document.getElementById('novel-title');
const backBtn = document.getElementById('back-btn');
const chapterSelect = document.getElementById('chapter-select');
const novelContent = document.getElementById('novel-content');

// 解析小说内容的函数
function parseNovelContent(content) {
  // 移除文件开头的广告信息
  let cleanedContent = content.replace(/下载自搜书吧：www\.soushu\d+\.com/g, '');
  cleanedContent = cleanedContent.replace(/备用地址：www\.soushu\d+\.com/g, '');
  cleanedContent = cleanedContent.trim();
  
  // 提取作者信息
  let author = '未知作者';
  const authorMatch = cleanedContent.match(/作者：([^\n]+)/);
  if (authorMatch && authorMatch[1]) {
    author = authorMatch[1].trim();
    // 移除作者行
    cleanedContent = cleanedContent.replace(/作者：[^\n]+/g, '').trim();
  }
  
  // 按章节分割
  const chapterRegex = /第[\d零一二三四五六七八九十百千]+章/g;
  const chapterTitles = cleanedContent.match(chapterRegex) || [];
  
  if (chapterTitles.length === 0) {
    // 如果没有找到章节，整个内容作为一章
    return {
      author: author,
      chapters: [
        { id: 1, title: '第一章', content: cleanedContent }
      ]
    };
  }
  
  // 提取每个章节的内容
  const chapters = [];
  for (let i = 0; i < chapterTitles.length; i++) {
    const startIndex = cleanedContent.indexOf(chapterTitles[i]);
    const endIndex = i === chapterTitles.length - 1 ? cleanedContent.length : cleanedContent.indexOf(chapterTitles[i + 1]);
    const chapterContent = cleanedContent.substring(startIndex, endIndex).trim();
    
    chapters.push({
      id: i + 1,
      title: chapterTitles[i],
      content: chapterContent
    });
  }
  
  return {
    author: author,
    chapters: chapters
  };
}

// 初始化小说列表
function initNovelList() {
  // 从页面中的特殊标签读取小说内容
  const novelElements = document.querySelectorAll('.novel-content');
  
  novelElements.forEach((element, index) => {
    const fileName = element.dataset.filename;
    const fileContent = element.textContent;
    
    // 提取小说标题（从文件名中提取）
    const title = fileName.replace(/\.txt$/, '').trim();
    
    // 解析小说内容
    const parsedNovel = parseNovelContent(fileContent);
    
    // 创建小说对象
    const novel = {
      id: index + 1,
      title: title,
      author: parsedNovel.author,
      cover: `https://via.placeholder.com/200x300?text=${encodeURIComponent(title)}`,
      chapters: parsedNovel.chapters
    };
    
    novels.push(novel);
  });
  
  // 如果没有找到小说，显示提示信息
  if (novels.length === 0) {
    novelList.innerHTML = '<p style="text-align: center; font-size: 18px; color: #666;">暂无小说，请添加TXT小说文件到novels目录</p>';
    return;
  }
  
  // 渲染小说列表
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
        <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${novel.title}</h3>
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
