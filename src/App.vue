<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="isKeepAlive">
      <component :is="Component" />
    </keep-alive>
    <component :is="Component" v-if="!isKeepAlive" />
  </router-view>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
const isKeepAlive = ref(route.meta.keepAlive)
</script>

<style scoped>

</style>
