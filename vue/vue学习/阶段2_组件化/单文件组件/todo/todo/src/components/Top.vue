<template>
  <div class="Top">
    <input
      type="text"
      v-model="neirong"
      @keyup.enter="tianJia"
      placeholder="请输入待办，回车或点击按钮保存"
    />
    <button @click="tianJia">添加</button>
  </div>
</template>

<script>
export default {
  name: "Top",
  props: ["dolis"],
  data() {
    return {
      neirong: "",
    };
  },
  methods: {
    // 添加操作，直接追加在数组之前
    tianJia() {
      // trim()去除前后的空格
      if (this.neirong.trim() !== "") {
        // unshift() 方法，在原数组之前添加内容
        this.dolis.unshift({
          id: new Date().valueOf(),
          checkeds: false,
          text: this.neirong.trim(),
          creat: false,
        });
      }
      // 清空输入
      this.neirong = "";
    },
    a() {},
  },
};
</script>

<style scoped>
.Top input {
  width: 65vw;
  height: 2vh;
}

.Top button {
  width: 5vw;
  height: 3vh;
}
</style>