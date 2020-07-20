import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'
import axios from 'axios'
import store from './store/store' // 引入全局store
import { post, get, getFrom, upExcel } from './assets/js/axios'

import {
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  RadioGroup,
  RadioButton,
  Radio,
  Table,
  TableColumn,
  Alert,
  Select,
  Option,
  Pagination
} from 'element-ui'
Vue.prototype.$get = get
Vue.prototype.$get_from = getFrom
Vue.prototype.$up_excel = upExcel
Vue.prototype.$post = post
Vue.prototype.$http = axios
Vue.prototype.axios = axios

Vue.config.productionTip = false

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(MenuItemGroup)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Radio)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Alert)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
