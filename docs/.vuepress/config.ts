// 配置文件

import { defineUserConfig, defaultTheme } from "vuepress";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default {
  // base: "/apps/notes",
  title: "夏之一周间",
  description: "",
  head: [
    ["link", { rel: "icon", href: "/logo.ico" }],
    ["meta", { name: "keywords", content: "夏之一周间、前端、前端开发、嵌入式、wudetian、自学编程、吴忠添" }],
    ["meta", { name: "description", content: "夏之一周间、前端、前端开发、嵌入式、wudetian、自学编程、吴忠添" }],
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
  plugins: [
    nprogressPlugin(),
    docsearchPlugin({
      appId: "JHHY5HKLHZ",
      apiKey: "83e9600ad75bd3e09509fb5bb8ddd568",
      indexName: "wuzhongtian",
      translations: {
        button: {
          buttonText: "搜索文档",
          buttonAriaLabel: "搜索文档",
        },
        modal: {
          searchBox: {
            resetButtonTitle: "清除查询条件",
            resetButtonAriaLabel: "清除查询条件",
            cancelButtonText: "取消",
            cancelButtonAriaLabel: "取消",
          },
          startScreen: {
            recentSearchesTitle: "最近搜索",
            noRecentSearchesText: "最近没有搜索",
            saveRecentSearchButtonTitle: "保存此搜索",
            removeRecentSearchButtonTitle: "删除此历史记录",
            favoriteSearchesTitle: "收藏夹",
            removeFavoriteSearchButtonTitle: "从收藏夹中删除此搜索",
          },
          errorScreen: {
            titleText: "无法获取结果",
            helpText: "您可能需要检查网络连接。",
          },
          // footer: {
          //   selectText: "to select",
          //   selectKeyAriaLabel: "Enter key",
          //   navigateText: "to navigate",
          //   navigateUpKeyAriaLabel: "Arrow up",
          //   navigateDownKeyAriaLabel: "Arrow down",
          //   closeText: "to close",
          //   closeKeyAriaLabel: "Escape key",
          //   searchByText: "Search by",
          // },
          // noResultsScreen: {
          //   noResultsText: "No results for",
          //   suggestedQueryText: "Try searching for",
          //   reportMissingResultsText:
          //     "Believe this query should return results?",
          //   reportMissingResultsLinkText: "Let us know.",
          // },
        },
      },
    }),
  ],

  theme: defaultTheme({
    logo: "/logo.png",
    repo: "https://github.com/wuZhongtian",
    editLink: false,
    sidebarDepth: 5,
    navbar: [
      {
        text: "首页",
        link: "https://wudetian.top/",
      },
      {
        text: "开始阅读",
        link: "/notes/directory",
      },
      {
        text: "Gitee",
        link: "https://gitee.com/wuZhongtian",
      },
    ],
    sidebar: {
      "/notes/": [
        {
          text: "大前端",
          collapsible: true,
          children: [
            "/notes/front_end/NextJS.md",
            "/notes/front_end/Vue2.md",
            "/notes/front_end/Vue3.md",
            "/notes/front_end/React.md",
            "/notes/front_end/React+.md",
            "/notes/front_end/NodeJS.md",
            {
              text: "小程序",
              collapsible: true,
              children: ["/notes/front_end/小程序/微信小程序.md", "/notes/front_end/小程序/uniapp.md", "/notes/front_end/小程序/有赞组件开发.md", "/notes/front_end/小程序/饿了么组件开发.md"],
            },
            {
              text: "JS周边库",
              collapsible: true,
              children: ["/notes/front_end/JS周边库/fabric.md", "/notes/front_end/JS周边库.md"],
            },
            "/notes/front_end/前后端通讯.md",
            "/notes/front_end/TypeScript.md",
            "/notes/front_end/构建工具.md",
            "/notes/front_end/ECMAScript.md",
            "/notes/front_end/JS设计模式.md",
            "/notes/front_end/H5C3补充.md",
            "/notes/front_end/其他概念.md",
          ],
        },
        {
          text: "嵌入式",
          collapsible: true,
          children: ["/notes/embedded/stm32.md", "/notes/embedded/ESP32-Python.md", "/notes/embedded/模电数电.md", "/notes/embedded/C语言.md", "/notes/embedded/计算机网络.md", "/notes/embedded/51单片机.md", "/notes/embedded/其他概念.md"],
        },
        {
          text: "数据库",
          collapsible: true,
          children: ["/notes/database/MySQl.md", "/notes/database/MongoDB.md"],
        },
        {
          text: "鸿蒙开发",
          collapsible: true,
          children: ["/notes/harmonyos/应用开发.md", "/notes/harmonyos/设备开发.md"],
        },
        {
          text: "Blender建模",
          link: "/notes/Blender.md",
        },
        "/notes/Git.md",
        "/notes/Docker.md",
        "/notes/Linux.md",
        "/notes/网络安全.md",
        "/notes/其他概念.md",
      ],
    },
  }),
  themConfig: {
    displayAllHeaders: true,
    sidebarDepth: 4,
  },
};
