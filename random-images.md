# 随机图片展示

这是一个使用API获取10张随机图片的示例页面。

<div id="random-images-container" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;"></div>

<script>
// 使用提供的API获取随机图片
const apiUrl = 'https://cnmiw.com/api.php?sort=CDNrandom&type=json&num=10';
const container = document.getElementById('random-images-container');

// 创建一个函数来获取图片
async function fetchRandomImages() {
  try {
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
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = `Random Image ${index + 1}`;
      imgElement.style.width = '200px';
      imgElement.style.height = '200px';
      imgElement.style.objectFit = 'cover';
      imgElement.style.borderRadius = '8px';
      imgElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      container.appendChild(imgElement);
    });
  } catch (error) {
    console.error('Error fetching random images:', error);
    container.innerHTML = '<p>Failed to load images. Please try again later.</p>';
  }
}

// 页面加载时获取图片
fetchRandomImages();
</script>
