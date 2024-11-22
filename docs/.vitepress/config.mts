import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
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
    title: "夏之一周间",
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
      [
        "meta",
        { name: "baidu-site-verification", content: "codeva-HRcMvYvHP8" },
      ],
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
          text: "嵌入式",
          items: [
            { text: "C语言", link: "/notes/embedded/c语言.md" },
            { text: "模电数电", link: "/notes/embedded/模电数电.md" },
            { text: "计算机网络", link: "/notes/embedded/计算机网络.md" },
            { text: "51单片机", link: "/notes/embedded/51单片机.md" },
            { text: "stm32", link: "/notes/embedded/stm32.md" },
            { text: "RTOS", link: "/notes/embedded/RTOS.md" },
            { text: "ESP32-Python", link: "/notes/embedded/ESP32-Python.md" },
            { text: "其他概念", link: "/notes/embedded/其他概念.md" },
          ],
        },
        {
          text: "其他技术",
          items: [
            {
              text: "鸿蒙开发",
              items: [
                { text: "应用开发", link: "/notes/harmonyos/应用开发.md" },
                { text: "设备开发", link: "/notes/harmonyos/设备开发.md" },
              ],
            },
            {
              text: "数据库",
              items: [
                { text: "MySQL", link: "/notes/database/MySQL.md" },
                { text: "MongoDB", link: "/notes/database/MongoDB.md" },
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
        {
          text: "生活",
          items: [{ text: "C1驾驶证", link: "/life/C1驾驶证.md" }],
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

        "/notes/embedded/": [
          { text: "C语言", link: "/notes/embedded/c语言.md" },
          { text: "模电数电", link: "/notes/embedded/模电数电.md" },
          { text: "计算机网络", link: "/notes/embedded/计算机网络.md" },
          { text: "51单片机", link: "/notes/embedded/51单片机.md" },
          { text: "stm32", link: "/notes/embedded/stm32.md" },
          { text: "RTOS", link: "/notes/embedded/RTOS.md" },
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
          {
            text: "数据库",
            collapsed: false,
            items: [
              { text: "MySQL", link: "/notes/database/MySQL.md" },
              { text: "MongoDB", link: "/notes/database/MongoDB.md" },
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
        "/life/": [{ text: "C1驾驶证", link: "/life/C1驾驶证.md" }],
      },

      socialLinks: [
        {
          icon: {
            svg: '<svg t="1730797916712" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4285" width="200" height="200"><path d="M517.176889 28.444444c124.359111 0 240.184889 46.449778 328.931555 122.965334 2.190222 2.56 4.124444 5.048889 5.632 7.409778 55.025778 127.232-75.064889 181.276444-130.104888 145.052444-55.04-36.224-15.416889-91.363556-42.737778-101.134222-44.657778 2.645333-80.554667 47.829333-145.422222 53.802666-13.482667 0-47.886222-6.570667-79.217778-4.764444-30.862222 1.777778-59.633778 10.695111-70.926222 10.695111-68.935111-4.352-94.208-36.622222-105.856-26.652444-3.541333 16.568889 3.626667 80.170667-1.678223 107.548444-5.319111 27.377778-54.727111 93.795556-65.792 162.759111-11.050667 68.977778-6.385778 113.891556 7.338667 149.319111 13.724444 35.413333 81.692444 165.091556 316.131556 165.091556 242.602667-2.275556 312.604444-135.253333 312.604444-179.100445 0-43.861333-24.277333-56.817778-141.525333-64.426666-117.248-7.594667-186.595556-3.811556-192.810667-47.672889-6.215111-43.861333 15.872-76.586667 55.822222-82.958222 39.964444-6.371556 177.464889-8.675556 227.982222-4.337778 50.161778 4.309333 223.288889 54.186667 198.570667 218.424889-64.241778 196.821333-257.265778 334.563556-476.942222 334.563555C247.253333 995.029333 28.444444 787.086222 28.444444 517.162667 28.444444 247.267556 247.253333 28.444444 517.176889 28.444444z" fill="#d81e06" p-id="4286"></path></svg>',
          },
          link: "https://gitcode.com/wudetian/personal-notes/overview",
        },
        { icon: "github", link: "https://github.com/wuZhongtian" },
      ],

      footer: {
        message: `Copyright © 2021-${new Date().getFullYear()}  夏至一周间 `,
        copyright: `备案号：<a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021031240号-1</a>`,
      },
    },
    pwa: {
      base: "/",
      scope: "/",
      outDir: ".vitepress/dist", // 输出目录
      registerType: "autoUpdate", // 注册类型为自动更新
      includeManifestIcons: false, // 不包含清单图标
      manifest: {
        name: "夏之一周间", // 应用名称
        short_name: "夏之一周间", // 应用的短名称
        description: "前端打工仔的成长日记", // 应用的描述
        start_url: "/", // 应用启动路径
        display: "standalone", // 应用显示模式
        theme_color: "#ffffff",
        icons: [
          {
            src: "/logo.png", // 图标路径
            sizes: "120x120", // 图标尺寸
            type: "image/png", // 图标类型
          },
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
      },
    },
  })
);
