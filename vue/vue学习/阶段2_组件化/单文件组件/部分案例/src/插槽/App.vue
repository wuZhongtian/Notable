<template>
  <div>
    <p>123123</p>
    <Tow>
      <!-- 父组件中必须使用 template标签，使用 scope 属性接收数据 
           收到的数据是对象的格式，可以直接使用games.color获取
          实现：相同的数据显示不同的结构
      -->
      <template scope="games">
        <ol>
          <li v-for="(g, index) in games.game" :key="index">{{ g }}</li>
        </ol>
      </template>
    </Tow>
    <Tow>
      <template scope="games">
        <ul>
          <li v-for="(g, index) in games.game" :key="index">{{ g }}</li>
        </ul>
      </template>
    </Tow>
  </div>
</template>

<script>
import Tow from "./components/Tow.vue";
export default {
  components: { Tow },
  name: "App",
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>

