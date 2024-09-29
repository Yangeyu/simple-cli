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

const p = p5i();
let iteration = 0;
const len = 5;
let steps: any[] = [];

const newCoordinate = (x = 0, y = 0, len = 0, rad = 0) => {
  const nx = x + len * p.cos(rad);
  const ny = y + len * p.sin(rad);
  return [nx, ny];
};

const step = (x: number, y: number, rad: number) => {
  const length = len * p.random();
  const [nx, ny] = newCoordinate(x, y, length, rad);
  p.line(x, y, nx, ny);

  if (nx < -100 || nx > w || ny < -100 || ny > w) return;

  const rad1 = rad + (p.QUARTER_PI / 3) * p.random();
  const rad2 = rad - (p.QUARTER_PI / 3) * p.random();

  if (iteration <= 5 || p.random() > 0.5) { steps.push(() => step(nx, ny, rad1)); }
  if (iteration <= 5 || p.random() > 0.5) { steps.push(() => step(nx, ny, rad2)); }
};

const frame = () => {
  iteration++;
  if (steps.length === 0) return;
  const runArr = steps;
  steps = [];
  runArr.forEach(step => {
    step();
  });
};

const control = useRafFn(useThrottleFn(frame, 40), { immediate: false });

const setup = async () => {
  console.log(w, h);
  p.createCanvas(w, h);
  p.noiseSeed(+Date.now());
  p.stroke(25, 25, 25);
  p.noLoop();
  p.stroke('#00000010');
};
const r30 = p.PI / 12

const draw = () => {
  p.background('#fff');
  step(0, h * p.random(), r30 * p.random() - r30 / 2);
  step(w, h * p.random(), r30 * p.random() + p.PI - r30 / 2);
  control.resume();
};

onMounted(() => {
  if (!canvasRef.value) return;
  p.mount(canvasRef.value, { setup, draw });
});
</script>

<style scoped>
.canvas-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  mask-image: radial-gradient(circle, transparent, #fff);
}
</style>
