<template>
  <div class="list-container">
    <!-- 列表内容 -->
    <slot></slot>

    <!-- 加载中的样式 -->
    <div
      v-if="hasMore"
      ref="lazyLoadedRef"
      v-loading="hasMore"
      element-loading-text="Loading..."
      element-loading-background="transparent"
      class="w-full h-20 bg-transparent">
    </div>
  </div>
</template>
<script lang="ts" setup name="LazyList">
import { sleep } from '@/utils/common/utils';

type Props = {
  hasMore: boolean
}
type Emits = {
  (e: 'update'): void,
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const lazyLoadedRef = ref()

const { stop } = useIntersectionObserver(
  lazyLoadedRef,
  async ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      await sleep(500)
      emits('update')
    }
  },
)

</script>
<style lang="css" scoped>
.list-container {
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
}
</style>

