<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import backtotop from "./backtotop.vue";
import sponsor from "./sponsor.vue";
import WaterMark from "./WaterMark.vue"; // 水印组件
import RegisterSW from './RegisterSW.vue'
import { nextTick, provide } from "vue";

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>

<template>
  <DefaultTheme.Layout>
    <WaterMark />
    <template #layout-top>
    </template>
    <template #layout-bottom>
      <RegisterSW />
      <div class="myFooter">
        <span>访客总数 <span id="busuanzi_value_site_uv" /> 人</span>&emsp;
        <span>总访问量<span id="busuanzi_value_site_pv" /> 次</span>&emsp;
        <span>统计始于2024.10.29</span>
      </div>
    </template>
    <!-- 这里可以插入其他插槽组件 -->
    <template #doc-footer-before> 
      <backtotop />
    </template>
    <template #aside-outline-after>
      <sponsor/>
    </template>
  </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPFooter {
  border: none !important;
}
.myFooter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  font-size: 15px;
  color: gray;
}
</style>
