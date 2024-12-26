<script setup lang="ts">
import { ref } from "vue";
const visible = ref(true);

function closeBulletin() {
  visible.value = false;
}

setTimeout(function () {
  visible.value = false;
}, 10000);
</script>

<template>
  <div v-if="visible" class="bulletin-wrapper" style="width: 260px">
    <div class="bulletin-title">
      <span class="bulletin-icon left">
        <svg
          class="bulletin-icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
          style="
            width: 20px;
            height: 20px;
            font-size: 20px;
            color: rgb(255, 255, 255);
          "
        >
          <path
            d="M27.16 8.08l-1.53 1.29a10 10 0 0 1-.29 13.23l1.47 1.4a12 12 0 0 0 .35-15.88z"
            fill="currentColor"
          ></path>
          <path
            d="M21.58 12a6 6 0 0 1-.18 7.94l1.47 1.36a8 8 0 0 0 .23-10.59z"
            fill="currentColor"
          ></path>
          <path
            d="M18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0a1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1zM4 20h6.08a1 1 0 0 1 .71.3L17 26.57V5.43l-6.21 6.27a1 1 0 0 1-.71.3H4z"
            fill="currentColor"
          ></path>
        </svg>
        <span>公告</span>
      </span>
      <svg
        class="btn-close"
        @click="closeBulletin"
        t="1573745677073"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4448"
        width="22"
        height="22"
      >
        <path
          d="M512 34.133333a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133333z m209.4848 632.8064l-55.6032 55.466667-151.517867-151.125333-151.517866 151.1168-55.6032-55.466667 151.517866-151.108267L307.242667 364.714667l55.6032-55.466667 151.517866 151.125333 151.517867-151.1168 55.6032 55.466667-151.517867 151.099733z m0 0"
          p-id="4449"
        ></path>
      </svg>
    </div>

    <div class="bulletin-content">
      <h3 class="bulletin-h3">最近更新：</h3>
      <p class="bulletin-p">
        - C语言
        <a
          class="bulletin-link"
          href="https://notes.wudetian.top/notes/embedded/c%E8%AF%AD%E8%A8%80.html"
          target="_blank"
          >快速回顾完结！</a
        >
      </p>
      <p class="bulletin-p">
        - XLSX表格导入导出
        <a
          class="bulletin-link"
          href="https://notes.wudetian.top/notes/front_end/JS%E5%91%A8%E8%BE%B9%E5%BA%93.html"
          target="_blank"
          >JS周边</a
        >
      </p>

      <p class="notice-domain">
        WX公众号：
        <a
          href="https://wudetian.top/"
          class="notice-domain-link"
          target="_blank"
          >夏之一周间</a
        >
      </p>
      <p class="bulletin-p" style="margin-top: 20px"></p>
      <img class="bulletin-img" src="/qrcode.jpg" />
      <hr />
      <div class="btn-group">
        <a
          class="btn"
          href="/notes/front_end/directory.html#赞赏-buy-me-a-coffee"
          target="_blank"
          >赞赏</a
        >
      </div>
    </div>
  </div>
</template>

<style>
.notice-domain {
  background: #cfcfcfaf;
  text-align: center;
  border-radius: 10px;
  padding: 10px 5px;
  margin-top: 10px;
  font: 14px bold;
}

.bulletin-wrapper {
  position: fixed;
  top: 5rem;
  right: 1rem;
  z-index: 30;
  box-sizing: border-box;
  border-radius: 1rem;
  overflow-y: auto;
  background-color: #1b1446;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

.bulletin-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgb(255 255 255);
  padding: 0.5rem 1em;
}

.bulletin-icon {
  display: inline-flex;
}

.bulletin-icon.left {
  flex-direction: row;
  align-items: center;
}

.bulletin-icon.left > svg {
  margin-right: 0.375rem;
}

.btn-close {
  cursor: pointer;
  fill: currentColor;
}

.bulletin-content {
  padding: 1.5rem 2rem;
  background-color: #ffffff;
}

.bulletin-h3 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #000000;
  font-size: 16px;
  font-weight: bolder;
}

.bulletin-p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #000000;
  font-size: 14px;
}

.bulletin-link {
  color: red;
}

.bulletin-img {
  width: 100%;
  margin-top: -20px;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-top-width: 1px;
  border-style: solid;
  border-color: #1b1446;
}

.btn-group {
  text-align: center;
}

.btn {
  display: inline-block;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: #1b1446;
  text-align: center;
  line-height: 3rem;
  color: #ffffff;
}
</style>
