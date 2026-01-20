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
    
    // 直接获取10张图片，每张图片调用一次API
    const imagePromises = Array.from({ length: 10 }, async (_, index) => {
      try {
        const imgWrapper = document.createElement('div');
        imgWrapper.style.cssText = `
          width: 220px;
          height: 220px;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.5);
        `;
        
        imgWrapper.addEventListener('mouseenter', () => {
          imgWrapper.style.transform = 'scale(1.05)';
        });
        
        imgWrapper.addEventListener('mouseleave', () => {
          imgWrapper.style.transform = 'scale(1)';
        });
        
        const imgElement = document.createElement('img');
        imgElement.alt = `Random Image ${index + 1}`;
        imgElement.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        `;
        
        // 添加加载和错误事件
        imgElement.addEventListener('load', () => {
          console.log('图片加载成功:', imgElement.src);
          imgElement.style.opacity = '1';
        });
        
        imgElement.addEventListener('error', (e) => {
          console.error('图片加载失败:', imgElement.src, e);
          imgElement.src = 'https://via.placeholder.com/220x220?text=Image+Failed+to+Load';
          imgElement.style.opacity = '1';
        });
        
        // 设置初始透明度
        imgElement.style.opacity = '0';
        
        // 生成带时间戳的URL，避免缓存
        const imageUrl = `${apiUrl}?t=${Date.now()}_${index}`;
        imgElement.src = imageUrl;
        
        imgWrapper.appendChild(imgElement);
        container.appendChild(imgWrapper);
        
        return imgElement;
      } catch (error) {
        console.error(`获取第${index + 1}张图片时发生错误:`, error);
        return null;
      }
    });
    
    // 等待所有图片请求完成
    await Promise.all(imagePromises);
    
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
