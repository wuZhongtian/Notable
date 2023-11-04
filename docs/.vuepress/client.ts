// 客户端配置文件

import { defineClientConfig } from "@vuepress/client";
import MyComponent from "./component/MyComponent.vue";
import WaterMark from "./component/WaterMark.vue";
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("MyComponent", MyComponent); // 注册组件，实现在任意位置使用<MyComponent/>
    app.component("WaterMark", WaterMark);
  },
  setup() { },
  // rootComponents: [MyComponent], // 将它们直接放置在客户端 Vue 应用的根节点下
  layouts: {
    MyComponent, WaterMark// 在 Frontmatter中使用  --- layout: MyComponent ---
  },
  compilerOptions: {
    isCustomElement: (tag) => tag === 'WaterMark'
  }
});
