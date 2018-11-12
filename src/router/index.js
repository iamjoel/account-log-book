import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'
import com from './component'

Vue.use(Router)


export default new Router({
  routes: [
    ...menu,
    ...com,
    // 出错的默认地址
    {
      path: '*',
      redirect: '/'
    }
  ]
})


