// 配置文件

import { defineUserConfig, defaultTheme } from "vuepress";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default {
  title: "夏之一周间",
  description: "探索者的成长日记",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  plugins: [
    nprogressPlugin(),
    // docsearchPlugin({}),
  ],

  theme: defaultTheme({
    logo: "/logo.png",
    repo: "https://github.com/wuZhongtian/wuZhongtian.github.io",
    editLink: false,
    sidebarDepth: 4,
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "开始阅读",
        link: "/notes/directory",
      },
    ],
    sidebar: {
      "/notes/": [
        {
          text: "大前端",
          collapsible: true,
          children: [
            "/notes/front_end/Vue.md",
            "/notes/front_end/React.md",
            "/notes/front_end/NodeJS.md",
            {
              text: "小程序",
              collapsible: true,
              children: [
                "/notes/front_end/小程序/微信小程序.md",
                "/notes/front_end/小程序/uniapp.md",
              ],
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
          children: [
            "/notes/embedded/stm32.md",
            "/notes/embedded/模电数电.md",
            "/notes/embedded/C语言.md",
            "/notes/embedded/计算机网络.md",
          ],
        },
        {
          text: "数据库",
          collapsible: true,
          children: ["/notes/database/MySQl.md", "/notes/database/MongoDB.md"],
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
