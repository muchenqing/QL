import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto_sidebar.mjs";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/QL/",
  head: [["link", { rel: "icon", href: "/QL//qing.jpg" }]],
  title: "沐辰的简易仓库",
  description: "A VitePress Site",
  themeConfig: {
    outlineTitle:"目录",
    outline:[2,6],
    logo: "/qing.jpg", // 配置logo位置，public目录
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text:'首页',link:'/'},
      { text: 'MirlKoi', link:'https://cnmiw.com/'},
      { text: '视频/番', items:[
        {text:'哔哩哔哩',link:'https://www.bilibili.com/'},
        {text:'Web Emby(在线番剧) ',link:'https://cnmiw.com/acg/Daisysg.html'},
      ] },
      { text: '学习', items:[
        {text: '前端React',link:'https://docs.bugdesigner.cn/docs/front-end/react.html'},
        {text:'Python语法',link:'https://docs.bugdesigner.cn/docs/python/base.html'},
      ] },
      { text: 'Ubuntu', link: '/backend/rabbitmq' },
      
    ],

    sidebar: false, // 关闭侧边栏
    aside: "left", // 设置右侧侧边栏在左侧显示
    socialLinks: [
      { icon: 'github', link: 'https://github.com/muchenqing' }
    ],
    footer:{
      copyright:"Copyright @ 2026 Mu Chen"
    },
       // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
  
})
