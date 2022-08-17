<template>
  <div>
    <p>我是公共标题</p>
    <!-- 定义插槽/挖坑  并把该组件中的数据传递到插槽中,可以传递多个数据 -->
    <slot :game="games" :color="color">我是第一个插槽坑</slot>
  </div>
</template>

<script>
export default {
  name: "Two",
  data() {
    return {
      // 数据在子组件中
      games: ["王者", "cf", "csgo"],
      color: ["red", "yellow", "pink"],
    };
  },
};
</script>

<style>
</style>