import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 每一次调用的路径挂载在axios根路径上
// axios.defaults.baseURL='https://www.liulongbin.top:8888/api/private/v1'
Vue.config.productionTip = false
// 请求拦截器
axios.interceptors.request.use((config)=>{
  config.headers.Authorization=localStorage.getItem("token")
  return config
})
Vue.prototype.$http=axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
