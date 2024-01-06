import { createApp } from 'vue'
import router from '@/router'
import './style.css'
import App from './App.vue'
import { Button } from 'vant'
import 'lib-flexible/flexible'
import '@/common/style/theme.css';
const app = createApp(App);

// 注册路由
app.use(router);
//注册组件
app.use(Button);
// 挂在app实例
app.mount('#app');
