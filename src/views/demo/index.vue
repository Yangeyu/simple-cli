<template>
  <div class="w-full ">
    <VirtualList class="" :data="list" @update="onUpdate">
      <template #item="{item}">
        {{ item }}
      </template>
    </VirtualList>
  </div>
</template>
<script lang="ts" setup>
import VirtualList from './VirtualList.vue';
console.log(import.meta.env);

const list = shallowRef(Array.from({ length: 100 }).map((_, i) => i + ''));
const onUpdate = () => {
  const l = Array.from({ length: 20 }).map((_, i) => `____${i}`)
  list.value = [...list.value, ...l]
}
</script>
<style scoped></style>
