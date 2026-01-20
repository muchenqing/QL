# 随机图（全部）

这是一个使用API获取随机图片的展示页面。

<div id="random-images-container" style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; padding: 20px;"></div>

<script>
// 使用提供的API获取随机图片
const apiUrl = 'https://cnmiw.com/api.php?sort=CDNrandom';
const container = document.getElementById('random-images-container');

// 创建一个函数来获取图片
async function fetchRandomImages() {
  try {
    // 显示加载状态
    container.innerHTML = '<p style="text-align: center; font-size: 18px; color: #333;">正在加载随机图片...</p>';
    
    console.log('开始请求10张随机图片');
    
    // 清空容器
    container.innerHTML = '';
    
    // 直接获取10张图片，每张图片使用一个iframe
    for (let i = 0; i < 10; i++) {
      try {
        const imgWrapper = document.createElement('div');
        imgWrapper.style.cssText = `
          width: 220px;
          height: 220px;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
          position: relative;
          background-color: rgba(255, 255, 255, 0.5);
        `;
        
        imgWrapper.addEventListener('mouseenter', () => {
          imgWrapper.style.transform = 'scale(1.05)';
        });
        
        imgWrapper.addEventListener('mouseleave', () => {
          imgWrapper.style.transform = 'scale(1)';
        });
        
        // 生成带时间戳的URL，避免缓存
        const imageUrl = `${apiUrl}?t=${Date.now()}_${i}`;
        console.log(`创建图片${i+1}的iframe:`, imageUrl);
        
        // 使用iframe来加载图片，避免跨域问题
        const iframe = document.createElement('iframe');
        iframe.src = imageUrl;
        iframe.style.cssText = `
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        
        // 监听iframe加载事件
        iframe.onload = function() {
          console.log(`iframe${i+1}加载成功`);
          iframe.style.opacity = '1';
        };
        
        iframe.onerror = function(e) {
          console.error(`iframe${i+1}加载失败:`, e);
          // 如果iframe加载失败，显示占位图
          iframe.style.display = 'none';
          const placeholder = document.createElement('img');
          placeholder.src = 'https://via.placeholder.com/220x220?text=Image+Failed+to+Load';
          placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
          `;
          imgWrapper.appendChild(placeholder);
        };
        
        imgWrapper.appendChild(iframe);
        container.appendChild(imgWrapper);
        
      } catch (error) {
        console.error(`获取第${i + 1}张图片时发生错误:`, error);
        // 创建一个错误占位符
        const errorWrapper = document.createElement('div');
        errorWrapper.style.cssText = `
          width: 220px;
          height: 220px;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          background-color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        const errorText = document.createElement('p');
        errorText.textContent = '加载失败';
        errorText.style.cssText = `
          color: #ff4444;
          font-size: 16px;
          margin: 0;
        `;
        errorWrapper.appendChild(errorText);
        container.appendChild(errorWrapper);
      }
    }
    
    console.log('图片渲染完成');
    
  } catch (error) {
    console.error('获取图片时发生错误:', error);
    container.innerHTML = `<p style="text-align: center; font-size: 18px; color: #ff4444;">加载图片失败: ${error.message}</p>`;
  }
}

// 添加刷新按钮
const refreshButton = document.createElement('button');
refreshButton.textContent = '刷新图片';
refreshButton.style.cssText = `
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

refreshButton.addEventListener('mouseenter', () => {
  refreshButton.style.transform = 'translateY(-2px)';
  refreshButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
});

refreshButton.addEventListener('mouseleave', () => {
  refreshButton.style.transform = 'translateY(0)';
  refreshButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
});

refreshButton.addEventListener('click', fetchRandomImages);

document.querySelector('h1').insertAdjacentElement('afterend', refreshButton);

// 页面加载时获取图片
fetchRandomImages();
</script>
