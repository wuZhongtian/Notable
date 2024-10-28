// 样式
import "./style/index.css"; //自定义样式
import DefaultTheme from "vitepress/theme";
import HomeUnderline from "./component/HomeUnderline.vue"; // 首页下划线
import confetti from "./component/confetti.vue";
import MyLayout from "./component/MyLayout.vue";
// import backtotop from "./component/backtotop.vue";
// import { h } from "vue"; // h函数
import mediumZoom from "medium-zoom";
import { onMounted, watch, nextTick } from "vue";
import { useData, useRoute } from "vitepress";

// 不蒜子
import { inBrowser } from "vitepress";
import busuanzi from "busuanzi.pure.js";

// 评论
import giscusTalk from "vitepress-plugin-comment-with-giscus";

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册全局组件

    app.component("confetti", confetti); // 五彩纸屑
    app.component("HomeUnderline", HomeUnderline); // 首页下划线

    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  },
  Layout: MyLayout,
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     "doc-footer-before": () => h(backtotop), // 使用doc-footer-before插槽
  //   });
  // },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    // Get frontmatter and route
    const { frontmatter } = useData();

    // giscus配置
    giscusTalk(
      {
        repo: "wuZhongtian/Notable", //仓库
        repoId: "R_kgDOKbNZTg", //仓库ID
        category: "Announcements", // 讨论分类
        categoryId: "DIC_kwDOKbNZTs4CjvsK", //讨论分类ID
        mapping: "pathname",
        inputPosition: "bottom",
        lang: "zh-CN",
      },
      {
        frontmatter,
        route,
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
};
