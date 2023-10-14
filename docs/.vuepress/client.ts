// 客户端配置文件

import { defineClientConfig } from "@vuepress/client";
import MyComponent from "../component/MyComponent.vue";
export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  // rootComponents: [MyComponent], // 将它们直接放置在客户端 Vue 应用的根节点下
  layouts: {
    MyComponent, // 在 Frontmatter中使用  --- layout: MyComponent ---
  },
  enhance({ app }) {
    app.component("MyComponent", MyComponent); // 注册组件，实现在任意位置使用<MyComponent/>
  },
});
