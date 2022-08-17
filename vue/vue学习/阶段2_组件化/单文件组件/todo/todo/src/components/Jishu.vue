<template>
  <div class="Jishu" v-if="dolis.length">
    <input type="checkbox" :checked="checkbox" @click="gouxuan" />
    <span>已完成 {{ a }} / 全部 {{ dolis.length }}</span>
  </div>
</template>

<script>
export default {
  props: ["dolis"],
  computed: {
    a() {
      return this.dolis.filter((i) => i.checkeds == true).length;
    },
    checkbox() {
      return this.dolis.length == this.a;
    },
  },
  methods: {
    gouxuan(e) {
      this.$emit("checkbtn", e.target.checked);
    },
  },
};
</script>

<style>
.Jishu {
  margin-top: 5vh;
}
</style>