<script setup>
import { nextTick } from 'vue'
import watermark from "../utils/watermark";
nextTick(() => {
  if (typeof window !== 'undefined') {
    window.document.querySelector("body .page") && watermark.set('夏之一周 wudetian.top (吾的天)', window.document.querySelector("body .page"))
  }
})
</script>
<template></template>