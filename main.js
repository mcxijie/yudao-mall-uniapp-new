import App from './App';
import { createSSRApp } from 'vue';
import { setupPinia } from './sheep/store';
import Vant from 'vant';
import 'vant/lib/index.css';

export function createApp() {
  const app = createSSRApp(App);

  // 设置 Pinia 状态管理
  setupPinia(app);

  // 全局引入 Vant 组件库
  app.use(Vant);

  return {
    app,
  };
}
