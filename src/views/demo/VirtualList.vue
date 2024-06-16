<template>
  <div ref="scrollRef" class="h-50vh w-full overflow-y-auto">
    <div
      :style="{ height: `${totalHeight}px` }"
      class="relative bg-red flex flex-col"
    >
      <ShowList 
        v-model="spaceItems"
        :list="showList"
        :top-height="topHeight">
        <template #item="{item}">
          <slot name="item" :item="item"></slot>
        </template>
      </ShowList>

      <ShowList 
        v-if="appendList.length !== 0"
        :list="appendList"
        :top-height="topHeight"
        class="invisible -z-1"
        @append-space="onAppendSpace"
      >
        <template #item="{item}">
          <slot name="item" :item="item"></slot>
        </template>
      </ShowList>

      <div ref="lineRef" class="absolute bottom-0"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShowList from './ShowList.vue';

type Props = {
  data: string[];
};
type Emits = {
  update: [];
};
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const appendList = shallowRef<string[]>([])
const spaceItems = ref<number[]>([]);
const showList = ref(props.data);
const scrollRef = ref<HTMLDivElement>();
const lineRef = ref<HTMLDivElement>();
const totalHeight = computed(() => {
  const result = Object.values(spaceItems.value).reduce((prev: number, cur: any) => {
    return prev + cur + 8;
  }, 0);
  console.log('...result:', result)
  return result
});

const topHeight = ref(0);

let viewHeigth = 0;
let offsetRectY = 0;

const onAppendSpace = (items: number[]) => {
  spaceItems.value.push(...items)
  appendList.value = []
}

const findStartIndex = (scrollTop: number) => {
  let accHeigth = 0;
  for (let [k, v] of Object.entries(spaceItems.value)) {
    accHeigth += (v as number) + 8;
    if (accHeigth > scrollTop) return Number(k);
  }
};

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
  offsetRectY = scrollRef.value?.getBoundingClientRect().y ?? 0;

  scrollRef.value?.addEventListener('scroll', () => {
    const scrollTop = scrollRef.value?.scrollTop ?? 0;
    const startIndex = findStartIndex(scrollTop);
    showList.value = props.data.slice(startIndex, startIndex! + 10);
    topHeight.value = spaceItems.value
      .slice(0, startIndex)
      .reduce((prev, cur) => prev + cur + 8, 0);
  });
});
</script>

<style scoped></style>
