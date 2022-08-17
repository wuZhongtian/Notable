<template>
  <div id="app">
    <Top :dolis="dolis"></Top>
    <Doli :dolis="dolis" @deleteabc="deleteabc"></Doli>
    <Jishu :dolis="dolis" @checkbtn="checkbtn"></Jishu>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import Top from "./components/Top.vue";
import Doli from "./components/Doli.vue";
import Jishu from "./components/Jishu.vue";
export default {
  name: "App",
  components: {
    Top,
    Jishu,
    Doli,
  },
  data() {
    return {
      dolis: JSON.parse(localStorage.getItem("dolis")) || [],
    };
  },
  methods: {
    // 勾选与取消勾选
    changechecked(hello, id) {
      //forEach 循环遍历数组的每一项，并让他们分别执行函数体
      this.dolis.forEach((i) => {
        if (i.id == id) {
          i.checkeds = !i.checkeds;
        }
      });
    },
    deleteabc(id) {
      this.dolis = this.dolis.filter((i) => {
        return i.id != id;
      });
    },
    // 全选
    checkbtn(a) {
      this.dolis.forEach((i) => {
        i.checkeds = a;
      });
    },
    // rightbtn(i) {
    //   i.creat = true;
    // },
    // blurcreat(i) {
    //   i.creat = false;
    // },
  },
  watch: {
    dolis: {
      deep: true,
      handler(a) {
        localStorage.setItem("dolis", JSON.stringify(a));
      },
    },
  },
  mounted() {
    // this.$bus.$on("rightbtn", this.rightbtn);
    // this.$bus.$on("blurcreat", this.blurcreat);
    this.pubhelloid = pubsub.subscribe("hello", this.changechecked);
  },
  beforeDestroy() {
    // this.$bus.$off("rightbtn");
    // this.$bus.$off("blurcreat");
    pubsub.subscribe(this.pubhelloid); //取消订阅
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
#app {
  width: 80vw;
  padding: 5vw;
  margin: 10vh 5vw;
  border: 1px solid rgb(167, 167, 167);
}
</style>
