<template>
  <div ref="scrollRef" class="h-50vh w-full overflow-y-auto">
    <div
      :style="{ height: `${totalHeight}px` }"
      class="relative bg-red flex flex-col"
    >
      <ShowList 
        v-model="spaceItems"
        :list="showList"
        :gap="gap"
        :top-height="topHeight">
        <template #item="{item}">
          <slot name="item" :item="item"></slot>
        </template>
      </ShowList>

      <ShowList 
        v-if="appendList.length !== 0"
        :list="appendList"
        :gap="gap"
        :top-height="topHeight"
        class="invisible -z-1"
        @append-space="onAppendSpace"
      >
        <template #item="{item}">
          <slot name="item" :item="item"></slot>
        </template>
      </ShowList>

      <div ref="lineRef" class="absolute bottom-0 h-1px w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShowList from './ShowList.vue';

type Props = {
  data: string[];
  preloadSum?: number
  gap?: number
};
type Emits = {
  update: [];
};
const props = withDefaults(defineProps<Props>(), { preloadSum: 2, gap: 8 });
const emits = defineEmits<Emits>();

const topHeight = ref(0);
const showList = ref(props.data);
const appendList = shallowRef<string[]>([])
const spaceItems = ref<number[]>([]);
const scrollRef = ref<HTMLDivElement>();
const lineRef = ref<HTMLDivElement>();
const totalHeight = computed(() => {
  const result = Object.values(spaceItems.value).reduce((prev: number, cur: any) => {
    return prev + cur + props.gap;
  }, 0) - props.gap;
  return result
});

let viewHeigth = 0;

const onAppendSpace = (items: number[]) => {
  spaceItems.value.push(...items)
  appendList.value = []
}

const findStartIndex = (scrollTop: number) => {
  let accHeigth = 0;
  for (let [k, v] of Object.entries(spaceItems.value)) {
    accHeigth += (v as number) + props.gap;
    if (accHeigth < scrollTop) continue ;
    const index = Number(k) - props.preloadSum
    return index < 0 ? 0 : index
  }
  return 0
};

const findEndIndex = (startIndex: number) => {
  let accHeigth = 0
  for (let i = startIndex; i <= spaceItems.value.length; i++) {
    accHeigth += spaceItems.value[i]
    if (accHeigth >= viewHeigth) return i + props.preloadSum + 1
  }
}

useIntersectionObserver(lineRef, ([{ isIntersecting }], observerElement) => {
  if (isIntersecting) {
    console.log('emit update');
    emits('update');
  }
});

watch(
  () => props.data,
  (val, oldVal) => {
    const diffLen = val.length - oldVal.length
    appendList.value = val.slice(-diffLen);
  },
  { deep: true }
);

onMounted(() => {
  viewHeigth = scrollRef.value?.offsetHeight ?? 0;

  scrollRef.value?.addEventListener('scroll', () => {
    const scrollTop = scrollRef.value?.scrollTop ?? 0;
    const startIndex = findStartIndex(scrollTop);

    const endIndex = findEndIndex(startIndex)
    console.log(startIndex, endIndex)
    showList.value = props.data.slice(startIndex, endIndex);
    topHeight.value = spaceItems.value
      .slice(0, startIndex)
      .reduce((prev, cur) => prev + cur + props.gap, 0);
  });
});
</script>

<style scoped></style>
