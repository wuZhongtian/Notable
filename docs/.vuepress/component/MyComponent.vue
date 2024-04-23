<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Application } from "@splinetool/runtime";
onMounted(() => {
  const CanvasApp = document.getElementById("canvasApp");
  if (CanvasApp) {
    CanvasApp.style.opacity = 1;
  } else {
    const app = document.querySelector(".hero");
    const canvas = document.createElement("canvas");
    canvas.id = "canvasApp";
    app.before(canvas);
    const canvasApp = new Application(canvas);
    canvasApp.load("https://prod.spline.design/peSqOv7Cc5yFPf7j/scene.splinecode");
  }
});
onBeforeUnmount(() => {
  const canvas = document.getElementById("canvasApp");
  canvas.style.opacity = 0;
});
</script>
