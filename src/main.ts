import { createApp } from 'vue'
import '@/styles/index.css'
import 'virtual:uno.css'
import 'element-plus/es/components/message/style/css'
import App from './App.vue'
import { setupRouter } from './router'
import { ElMessage } from 'element-plus'

const app = createApp(App)
setupRouter(app)
app.mount('#app')

// TODO: 设置弹窗组件
window.$message = ElMessage
