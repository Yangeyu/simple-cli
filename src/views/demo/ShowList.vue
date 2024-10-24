<template>
  <div
    ref="showListRef"
    :style="{
      willChange: 'transform',
      transform: `translateY(${topHeight}px)`,
      gap: `${gap ?? 0}px` }"
    class="fc-cc absolute w-full"
  >
    <div
      v-for="(item, i) in list"
      :ref="(el: any) => itemsRef[i] = el"
      :key="item"
      class="w-full"
    >
      <slot name="item" :item="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  topHeight: number;
  list: string[];
  gap?: number
};
type Emits = {
  'appendSpace': [data: number[]]
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>()

const spaceItems = defineModel<number[]>({ default: [] })

const showListRef = ref<HTMLDivElement>();
const itemsRef = ref<HTMLDivElement[]>([]);

onMounted(() => {
  itemsRef.value.forEach((el, i) => {
    spaceItems.value[i] = el.offsetHeight;
  });
  emits('appendSpace', spaceItems.value)

});
</script>

<style scoped></style>
