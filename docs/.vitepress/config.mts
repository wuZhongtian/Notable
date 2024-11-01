import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: "/", // 设置站点根路径
  lang: "zh-CN",
  metaChunk: true,
  lastUpdated: true, // 使用 Git 获取每个页面的最后更新时间戳
  markdown: {
    lineNumbers: true, // 显示代码块行号
    image: {
      lazyLoading: true, // 开启懒加载图片
    },
    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, "[!code");
        },
      },
    ],
  },
  sitemap: {
    hostname: "https://notes.wudetian.top",
  },
  title: "夏之一周",
  description:
    "夏之一周、夏之一周、前端、前端开发、嵌入式、wudetian、自学编程、吴忠添",
  head: [
    ["link", { rel: "icon", href: "/logo.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "夏之一周间、夏之一周、前端、前端开发、嵌入式、wudetian、自学编程、吴忠添",
      },
    ],
    ["meta", { name: "baidu-site-verification", content: "codeva-HRcMvYvHP8" }],
    [
      "script",
      {},
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "ork2q0e007");`,
    ],
    [
      "script",
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7d6014f90608f65e2463d1bde602b37a";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`,
    ],
  ],
  themeConfig: {
    logo: "/logo.png",
    darkModeSwitchLabel: "暗色模式",
    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    outline: {
      // level: [2, 4], // 显示2-4级标题
      level: "deep", // 显示2-6级标题
      label: "当前页大纲", // 文字显示
    },
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
              closeText: "关闭",
            },
          },
        },
      },
    },
    //上次更新时间
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short", // 可选值full、long、medium、short
        timeStyle: "medium", // 可选值full、long、medium、short
      },
    },
    docFooter: {
      prev: "上一页", //自定义上下页名
      next: "下一页",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "主页",
        link: "https://wudetian.top/",
      },
      {
        text: "大前端",
        items: [
          { text: "NextJS", link: "/notes/front_end/NextJS.md" },
          { text: "Vue2", link: "/notes/front_end/Vue2.md" },
          { text: "Vue3", link: "/notes/front_end/Vue3.md" },
          { text: "React", link: "/notes/front_end/React.md" },
          { text: "React+", link: "/notes/front_end/React+.md" },
          { text: "NodeJS", link: "/notes/front_end/NodeJS.md" },
          { text: "微前端", link: "/notes/front_end/微前端.md" },
          { text: "前后端通讯", link: "/notes/front_end/前后端通讯.md" },
          { text: "TypeScript", link: "/notes/front_end/TypeScript.md" },
          { text: "构建工具", link: "/notes/front_end/构建工具.md" },
          { text: "ECMAScript", link: "/notes/front_end/ECMAScript.md" },
          { text: "JS设计模式", link: "/notes/front_end/JS设计模式.md" },
          { text: "H5C3补充", link: "/notes/front_end/H5C3补充.md" },
          { text: "其他概念", link: "/notes/front_end/其他概念.md" },
          {
            text: "小程序",
            items: [
              {
                text: "微信小程序",
                link: "/notes/front_end/小程序/微信小程序.md",
              },
              { text: "Uniapp", link: "/notes/front_end/小程序/uniapp.md" },
              {
                text: "有赞组件",
                link: "/notes/front_end/小程序/有赞组件开发.md",
              },
              {
                text: "饿了么组件",
                link: "/notes/front_end/小程序/饿了么组件开发.md",
              },
            ],
          },
          {
            text: "JS周边",
            items: [
              { text: "fabric", link: "/notes/front_end/JS周边库/fabric.md" },
              { text: "JS周边", link: "/notes/front_end/JS周边库.md" },
            ],
          },
        ],
      },
      {
        text: "数据库",
        items: [
          { text: "MySQL", link: "/notes/database/MySQL.md" },
          { text: "MongoDB", link: "/notes/database/MongoDB.md" },
        ],
      },
      {
        text: "嵌入式",
        items: [
          { text: "C语言", link: "/notes/embedded/c语言.md" },
          { text: "模电数电", link: "/notes/embedded/模电数电.md" },
          { text: "计算机网络", link: "/notes/embedded/计算机网络.md" },
          { text: "51单片机", link: "/notes/embedded/51单片机.md" },
          { text: "stm32", link: "/notes/embedded/stm32.md" },
          { text: "ESP32-Python", link: "/notes/embedded/ESP32-Python.md" },
          { text: "其他概念", link: "/notes/embedded/其他概念.md" },
        ],
      },
      {
        text: "其他内容",
        items: [
          { text: "Blender建模", link: "/notes/Blender.md" },
          { text: "Git", link: "/notes/Git.md" },
          { text: "Docker", link: "/notes/Docker.md" },
          { text: "Linux", link: "/notes/Linux.md" },
          { text: "网络安全", link: "/notes/网络安全.md" },
          { text: "其他概念", link: "/notes/其他概念.md" },
          { text: "工具资源", link: "/notes/工具资源.md" },
          {
            text: "鸿蒙开发",
            items: [
              { text: "应用开发", link: "/notes/harmonyos/应用开发.md" },
              { text: "设备开发", link: "/notes/harmonyos/设备开发.md" },
            ],
          },
        ],
      },
      // {
      //   text: "Gitee",
      //   link: "https://gitee.com/wuZhongtian",
      // },
    ],

    sidebar: {
      "/notes/front_end/": [
        { text: "NextJS", link: "/notes/front_end/NextJS.md" },
        { text: "Vue2", link: "/notes/front_end/Vue2.md" },
        { text: "Vue3", link: "/notes/front_end/Vue3.md" },
        { text: "React", link: "/notes/front_end/React.md" },
        { text: "React+", link: "/notes/front_end/React+.md" },
        { text: "NodeJS", link: "/notes/front_end/NodeJS.md" },
        { text: "微前端", link: "/notes/front_end/微前端.md" },
        { text: "前后端通讯", link: "/notes/front_end/前后端通讯.md" },
        { text: "TypeScript", link: "/notes/front_end/TypeScript.md" },
        { text: "构建工具", link: "/notes/front_end/构建工具.md" },
        { text: "ECMAScript", link: "/notes/front_end/ECMAScript.md" },
        { text: "JS设计模式", link: "/notes/front_end/JS设计模式.md" },
        { text: "H5C3补充", link: "/notes/front_end/H5C3补充.md" },
        { text: "其他概念", link: "/notes/front_end/其他概念.md" },
        {
          text: "小程序",
          collapsed: true,
          items: [
            {
              text: "微信小程序",
              link: "/notes/front_end/小程序/微信小程序.md",
            },
            { text: "Uniapp", link: "/notes/front_end/小程序/uniapp.md" },
            {
              text: "有赞组件",
              link: "/notes/front_end/小程序/有赞组件开发.md",
            },
            {
              text: "饿了么组件",
              link: "/notes/front_end/小程序/饿了么组件开发.md",
            },
          ],
        },
        {
          text: "JS周边",
          collapsed: true,
          items: [
            { text: "fabric", link: "/notes/front_end/JS周边库/fabric.md" },
            { text: "JS周边", link: "/notes/front_end/JS周边库.md" },
          ],
        },
      ],
      "/notes/database/": [
        { text: "MySQL", link: "/notes/database/MySQL.md" },
        { text: "MongoDB", link: "/notes/database/MongoDB.md" },
      ],
      "/notes/embedded/": [
        { text: "C语言", link: "/notes/embedded/c语言.md" },
        { text: "模电数电", link: "/notes/embedded/模电数电.md" },
        { text: "计算机网络", link: "/notes/embedded/计算机网络.md" },
        { text: "51单片机", link: "/notes/embedded/51单片机.md" },
        { text: "stm32", link: "/notes/embedded/stm32.md" },
        { text: "ESP32-Python", link: "/notes/embedded/ESP32-Python.md" },
        { text: "其他概念", link: "/notes/embedded/其他概念.md" },
      ],
      "/notes/": [
        {
          text: "鸿蒙开发",
          collapsed: false,
          items: [
            { text: "应用开发", link: "/notes/harmonyos/应用开发.md" },
            { text: "设备开发", link: "/notes/harmonyos/设备开发.md" },
          ],
        },
        { text: "Blender建模", link: "/notes/Blender.md" },
        { text: "Git", link: "/notes/Git.md" },
        { text: "Docker", link: "/notes/Docker.md" },
        { text: "Linux", link: "/notes/Linux.md" },
        { text: "网络安全", link: "/notes/网络安全.md" },
        { text: "其他概念", link: "/notes/其他概念.md" },
        { text: "工具资源", link: "/notes/工具资源.md" },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/wuZhongtian" }],

    footer: {
      message: `Copyright © 2021-${new Date().getFullYear()}  夏至一周间 `,
      copyright: `备案号：<a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021031240号-1</a>`,
    },
  },
});
