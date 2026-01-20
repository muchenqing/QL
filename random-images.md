# 随机图（全部）

这是一个使用API获取随机图片的展示页面。

<div id="random-images-container" style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; padding: 20px;"></div>

<script>
// 使用提供的API获取随机图片
const apiUrl = 'https://cnmiw.com/api.php?sort=CDNrandom&type=json&num=10';
const container = document.getElementById('random-images-container');

// 创建一个函数来获取图片
async function fetchRandomImages() {
  try {
    // 显示加载状态
    container.innerHTML = '<p style="text-align: center; font-size: 18px; color: #333;">正在加载随机图片...</p>';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Referer': 'https://weibo.com/'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // 清空容器
    container.innerHTML = '';
    
    // 遍历图片数据并创建图片元素
    data.forEach((image, index) => {
      const imgWrapper = document.createElement('div');
      imgWrapper.style.cssText = `
        width: 220px;
        height: 220px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
      `;
      
      imgWrapper.addEventListener('mouseenter', () => {
        imgWrapper.style.transform = 'scale(1.05)';
      });
      
      imgWrapper.addEventListener('mouseleave', () => {
        imgWrapper.style.transform = 'scale(1)';
      });
      
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = `Random Image ${index + 1}`;
      imgElement.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.3s ease;
      `;
      
      imgElement.addEventListener('load', () => {
        imgElement.style.opacity = '1';
      });
      
      imgElement.addEventListener('error', () => {
        imgElement.src = 'https://via.placeholder.com/220x220?text=Image+Failed+to+Load';
        imgElement.style.opacity = '1';
      });
      
      imgElement.style.opacity = '0';
      imgWrapper.appendChild(imgElement);
      container.appendChild(imgWrapper);
    });
  } catch (error) {
    console.error('Error fetching random images:', error);
    container.innerHTML = '<p style="text-align: center; font-size: 18px; color: #ff4444;">加载图片失败，请稍后重试。</p>';
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
