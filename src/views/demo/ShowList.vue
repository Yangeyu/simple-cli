<template>
  <div
    ref="showListRef"
    :style="{ top: `${topHeight}px` }"
    class="gap-2 fc-cc absolute w-full"
  >
    <div
      v-for="(item, i) in list"
      :ref="(el: any) => itemsRef[i] = el"
      :key="item"
      class="w-full bg-red-100"
      :class="[parseInt(item) % 2 === 0 ? 'h-30px' : 'h-40px']"
    >
      <slot name="item" :item="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  topHeight: number;
  list: string[];
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
