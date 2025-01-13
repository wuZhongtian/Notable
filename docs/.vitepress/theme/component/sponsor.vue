<script lang="ts" setup></script>
<template>
  <a
    class="btn"
    href="/notes/front_end/directory.html#赞赏-buy-me-a-coffee"
    target="_self"
  >
    <div class="box">成为赞助商</div>
  </a>
  <!-- <div class="qrcode">
    <img alt="微信公众号二维码" src="/qrcode.jpg" />
  </div> -->
</template>
<style scoped>
.box {
  margin-top: 20px;
  width: 100%;
  height: 80px;
  background-color: #f5f5f5;
  text-align: center;
  line-height: 80px;
  font-size: 12px;
  /* font-weight: bold; */
  border-radius: 12px;
}
.box:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}

.qrcode {
  margin-top: 10px;
}
.qrcode img {
  margin: 0 10%;
  width: 70%;
  height: auto;
}
.qrcode .btn {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 12px;
  margin-top: 10px;
  color: #000;
}
.qrcode .btn:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}
</style>
