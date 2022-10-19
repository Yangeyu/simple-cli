import { createApp } from 'vue'
import '@/styles/index.css'
import 'virtual:windi.css'
import App from './App.vue'
import { setupRouter } from './router'

const app = createApp(App)
setupRouter(app)
app.mount('#app')

// TODO: 设置弹窗组件
// window.$message = ??
