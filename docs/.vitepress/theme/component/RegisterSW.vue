<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const offlineReady = ref(false);
function onOfflineReady() {
  offlineReady.value = true;
}
async function close() {
  offlineReady.value = false;
}

onBeforeMount(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({
    immediate: true,
    onOfflineReady,
    onRegistered() {
      console.info("Service Worker 注册成功");
    },
    onRegisterError(e) {
      console.error("Service Worker 注册失败!", e);
    },
  });
});
</script>

<template>
  <div class="pwa-toast" role="alertdialog" aria-labelledby="pwa-message" v-if="offlineReady">
    <div id="pwa-message" class="mb-3">当前应用处于离线工作状态！</div>
    <button type="button" class="pwa-cancel" @click="close">关闭</button>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 100;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: white;
}
.pwa-toast #pwa-message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
