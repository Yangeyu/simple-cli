<template>
  <div class="w-full h-full">
    <div ref="canvasRef" class="canvas-wrapper"></div>
  </div>
</template>

<script setup lang="ts">
import { p5i } from 'p5i';
const canvasRef = ref<HTMLDivElement>();
let w = window.innerWidth;
let h = window.innerHeight;
const SPACING = 10;
const SCALE = 500;
const len = 10;
const offsetY = window.scrollY;

const p = p5i();
const points: { x: number; y: number; c: number }[] = [];
const pointsMemo = new Map();

const genPoint = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let x = 0; x < w; x = x + SPACING) {
    for (let y = 0; y < h; y = y + SPACING) {
      if (pointsMemo.get(`${x}-${y}`)) continue;
      points.push({ x, y, c: Math.random() * 0.5 + 0.5 });
      pointsMemo.set(`${x}-${y}`, true);
    }
  }
};

const setup = async () => {
  p.createCanvas(w, h);
  p.noiseSeed(+Date.now());
  p.noStroke();
  p.fill(25, 25, 25);
};

const draw = () => {
  p.background('#fff');
  const t = +Date.now() / 10000;
  // console.log(p.noise(t))
  for (let point of points) {
    const { x, y, c } = point;
    const rad = p.TWO_PI * 2 * (p.noise(x / SCALE, y / SCALE, t) - 0.5);
    const length = (p.noise(x / SCALE, y / SCALE, t) + 0.5) * len;
    const nx = p.cos(rad) * length + x;
    const ny = p.sin(rad) * length + y;
    p.fill(25, 25, 25, (p.abs(p.cos(rad)) * 0.7 + 0.3) * c * 255);
    p.circle(nx, ny, 2);
  }
};

onMounted(() => {
  genPoint();
  if (!canvasRef.value) return;
  p.mount(canvasRef.value, { setup, draw });
  window.addEventListener('resize', () => {
    genPoint();
    const w = window.innerWidth;
    const h = window.innerHeight;
    p.resizeCanvas(w, h);
  });
});
</script>

<style scoped>
.canvas-wrapper {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
