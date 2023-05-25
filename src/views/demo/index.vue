<template>
  <div>Demo</div>
  <ElButton @click="onClick">anniu</ElButton>
</template>
<script lang="ts" setup>
import { http } from '@/utils/axios';
import { ContentTypeEnum } from '@/utils/axios/enums';
import axios, { AxiosError } from 'axios';

http.request({ method: 'post', url: 'http://localhost:8000/' })
http.request({ method: 'post', url: 'http://localhost:8000/' })

http.request<{code: number, data: string}>({
  method: 'post',
  url: 'http://mm-test.zegonetwork.com:9010/api/pc/v1/live/template/list',
  data: {
    page: 1,
    limit: 30,
    categoryIds: [],
  },
  timeout: 1000,
  headers: {
    Token: '54bba876aec7280d50c2fd6373ff7f2c9900f88d87d094099fb8',
    'X-Signature': '34e25f6b69028c15f9a3f9d58e70dcdb8b6d9d13896684f44f0c5139379b1110',
    'X-Version': '1.0.0',
  },
}, {
  isIgnoreCancelToken: true,
})
setTimeout(() => {
  http.request({
    method: 'post',
    url: 'http://localhost:8000/',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',

    },
  }, {
    isIgnoreCancelToken: true,
  })
})

const onClick = () => {
  // http.request({
  //   method: 'post',
  //   url: 'http://mm-test.zegonetwork.com:9010/api/pc/v1/live/user/check',
  //   timeout: 1000,
  //   headers: {
  //     Token: 'd25a2d6bc0ad2188ceaec95b23cd8a73f75b3b0f1ff8e382dca5',
  //   },
  // }, {
  //   isRun: false,
  //   isIgnoreCancelToken: true,
  // })
  axios.request({
    method: 'post',
    url: 'http://localhost:8000/',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// fetchAxios.request({
//   method: 'post',
//   url: 'www',
// }, {
// isIgnoreCancelToken: true
// })
// fetchAxios.request({
//   method: 'post',
//   url: 'www',
// }, {
// isIgnoreCancelToken: false
// })

</script>
<style scoped>

</style>
