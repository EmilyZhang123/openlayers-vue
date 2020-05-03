import Vue from 'vue'
import App from './App.vue'
import 'ol/ol.css'
import './assets/scss/index.scss'

Vue.config.productionTip = false;
import router from "./router";
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { locale })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
