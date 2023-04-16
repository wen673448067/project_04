import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 配置axios的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在将axios挂载到vue原型之前先设置axios请求拦截器添加token，以保证拥有获取数据的权利
//请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息（对请求进行预处理操作）
axios.interceptors.request.use(config => {
    //为请求头对象，添加token验证的Authorization字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})


Vue.prototype.$http = axios



Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')