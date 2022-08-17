<template>
  <div class="Doli">
    <ul>
      <li v-for="i in dolis" :key="i.id">
        <!-- input监视按钮的改变，绑定事件的两种写法：@click点击事件/@change改变事件 -->
        <input type="checkbox" :checked="i.checkeds" @click="xuan(i.id)" />
        <span v-show="!i.creat">{{ i.text }}</span>
        <input
          v-show="i.creat"
          v-model="i.text"
          type="type"
          @blur="blurcreat(i)"
        />
        <button @click="deletebtn(i.id)">删除</button>
        <button @click="rightbtn(i)">编辑</button>
      </li>
    </ul>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "Doli",
  props: ["dolis"],
  methods: {
    xuan(id) {
      // 勾选按钮
      // this.$bus.$emit("changechecked", id);
      pubsub.publish("hello", id);
    },
    rightbtn(i) {
      i.creat = true;
      // this.$bus.$emit("rightbtn", i);
    },
    blurcreat(i) {
      i.creat = false;
      // this.$bus.$emit("blurcreat", i);
    },
    deletebtn(id) {
      if (confirm("确认删除吗？")) {
        this.$emit("deleteabc", id);
      }
    },
  },
};
</script>

<style scoped>
.Doli {
  margin-top: 10vh;
}

.Doli li {
  width: 70vw;
  height: 2em;
  border: 1px solid rgb(163, 157, 157);
  border-collapse: inherit;
}

.Doli li button {
  float: right;
  color: ivory;
  height: 100%;
  background-color: rgb(158, 55, 55);
  display: none;
}

.Doli li:hover button {
  display: block;
}
</style>