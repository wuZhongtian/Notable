<template>
  <div>
    <button @click="isshow = !isshow">点我切换</button>
    <transition name="elo" :appear="true">
      <h1 v-show="isshow">我是大标题</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isshow: true,
    };
  },
};
</script>
<style scoped>
h1 {
  height: 100px;
  line-height: 100px;
  width: 500px;
  background-color: rgb(84, 177, 55);
  transition: all 1s linear;
}

.elo-enter,
.elo-leave-to {
  transform: translateX(-600px);
}
.elo-leave,
.elo-enter-to {
  transform: translateX(0px);
}

/* @keyframes donghua {
  0% {
    transform: translateX(-600px);
  }
  100% {
    transform: translateX(0px);
  }
} */
</style>

