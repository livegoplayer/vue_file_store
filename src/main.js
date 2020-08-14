import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import store from './store/store' // 引入全局store
import { post, get, getFrom, upExcel, upLoadFile, upLoadFileToOSS } from './assets/js/axios'
// import wlExplorer from 'wl-explorer'
import 'wl-explorer/lib/wl-explorer.css'
// 引入树形下拉框
import './assets/css/wl-vue-select.css'

import scrollbarWidth from 'element-ui/src/utils/scrollbar-width'
import Scrollbar from '../src/components/scrollbar/index'
import Popover from '../src/components/popover/index'

Vue.use(ElementUI)
Vue.use(scrollbarWidth)
Vue.use(Scrollbar)
Vue.use(Popover)

Vue.prototype.$get = get
Vue.prototype.$get_from = getFrom
Vue.prototype.$up_excel = upExcel
Vue.prototype.$up_load = upLoadFile
Vue.prototype.$up_load_to_oss = upLoadFileToOSS
Vue.prototype.$post = post
Vue.prototype.$http = axios
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
